'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import {
  UploadIcon,
  XIcon,
  RefreshCwIcon,
  TriangleAlert,
  X,
} from 'lucide-react';
import { formatBytes } from '@/hooks/use-file-upload';
import { supabaseClient } from '@/lib/supabase/client';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface SupabaseUploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  url?: string;
  path?: string;
}

interface SupabaseUploadProps {
  bucket: string;
  path?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onUploadComplete?: (files: { url: string; name: string }[]) => void;
  onFileAdd?: (urls: string) => void;
  onFileRemove?: (urls: string) => void;
  onAllRemove?: () => void;
  resetKey?: number;
  editUrls?: string[];
  setEditUrls?: (urls: string[]) => void;
}

export default function SupabaseUpload({
  bucket,
  path = '',
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = '*',
  multiple = true,
  className,
  onUploadComplete,
  onFileAdd,
  onFileRemove,
  onAllRemove,
  resetKey,
  editUrls,
  setEditUrls,
}: SupabaseUploadProps) {
  const [files, setFiles] = useState<SupabaseUploadItem[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const selected = acceptedFiles.slice(0, maxFiles);

    const tooLarge = selected.filter(f => f.size > maxSize);
    if (tooLarge.length > 0) {
      toast.error(
        `Some files are too big! Max size is ${formatBytes(maxSize)}`,
        { richColors: true }
      );
      return;
    }

    const newFiles: SupabaseUploadItem[] = selected.map(f => ({
      id: crypto.randomUUID(),
      file: f,
      progress: 0,
      status: 'uploading',
    }));

    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => uploadToSupabase(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept === '*' ? undefined : { [accept]: [] },
    multiple,
  });

  const uploadToSupabase = async (item: SupabaseUploadItem) => {
    const cleanPath = path ? `${path.replace(/\/?$/, '/')}` : '';
    const safeName = item.file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filePath = `${cleanPath}${item.id}-${safeName}`;

    const { error } = await supabaseClient.storage
      .from(bucket)
      .upload(filePath, item.file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      setFiles(prev =>
        prev.map(f =>
          f.id === item.id ? { ...f, status: 'error', error: error.message } : f
        )
      );
      return;
    }

    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(filePath);

    setFiles(prev =>
      prev.map(f =>
        f.id === item.id
          ? {
              ...f,
              status: 'completed',
              progress: 100,
              url: data.publicUrl,
              path: filePath,
            }
          : f
      )
    );

    onFileAdd?.(data.publicUrl);
    onUploadComplete?.([{ url: data.publicUrl, name: item.file.name }]);
  };

  const retryUpload = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? { ...f, progress: 0, status: 'uploading', error: undefined }
            : f
        )
      );
      uploadToSupabase(file);
    }
  };

  const removeFile = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.path) {
      await supabaseClient.storage.from(bucket).remove([file.path]);
    }

    onFileRemove?.(files.find(f => f.id === fileId)?.url || '');
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const removeEditUrls = async (urls: string[]) => {
    if (!editUrls || !setEditUrls) return;

    const paths = urls.map(url => getPathFromUrl(url))?.filter(n => n);
    if (!paths?.length) return;

    const { error } = await supabaseClient.storage.from(bucket).remove(paths);

    if (error) return toast.error('Failed to delete', { richColors: true });

    setEditUrls(editUrls.filter(path => !urls.includes(path)));
    if (onFileRemove) urls.forEach(onFileRemove);
  };

  const clearAll = async () => {
    const completedPaths = files
      .filter(f => f.status === 'completed' && f.path)
      .map(f => f.path!) as string[];

    if (completedPaths.length > 0) {
      await supabaseClient.storage.from(bucket).remove(completedPaths);
    }

    if (editUrls?.length) {
      await removeEditUrls(editUrls);
      setEditUrls?.([]);
    }

    setFiles([]);
    onAllRemove?.();
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const uploadingCount = files.filter(f => f.status === 'uploading').length;

  // Clear all files when parent signals a reset
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip on initial render
    }

    // only reset the upload queue, not existing editUrls
    setFiles([]);
    onAllRemove?.();
  }, [resetKey]);

  return (
    <div className={cn('w-full max-w-2xl', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'rounded-lg min-h-52 border border-dashed p-6 text-center cursor-pointer transition grid place-content-center',
          isDragActive ? 'bg-muted' : ''
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon className='mx-auto mb-2 h-6 w-6' />
        {isDragActive ? (
          <p className='text-sm'>Drop the files here...</p>
        ) : (
          <p className='text-sm'>Drag & drop files here, or click to select</p>
        )}
        <p className='mt-2 text-sm text-muted-foreground'>
          Max {maxFiles} files • Up to {formatBytes(maxSize)} each
        </p>
      </div>

      {/* Stats */}
      {files.length > 0 && (
        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center gap-2'>
            <h4 className='text-sm font-medium'>Upload Progress</h4>
            <div className='flex items-center gap-2'>
              {completedCount > 0 && (
                <Badge variant='primary'>Completed: {completedCount}</Badge>
              )}
              {errorCount > 0 && (
                <Badge variant='destructive'>Failed: {errorCount}</Badge>
              )}
              {uploadingCount > 0 && (
                <Badge variant='secondary'>Uploading: {uploadingCount}</Badge>
              )}
            </div>
          </div>

          <Button onClick={clearAll} variant='outline' size='sm' type='button'>
            Clear all
          </Button>
        </div>
      )}

      <div className='flex flex-wrap gap-5 my-5'>
        {editUrls?.map((url, i) => (
          <div
            key={i}
            className='rounded-md w-44 md:w-48 overflow-hidden relative'
          >
            <X
              className='absolute inset-x-[85%] inset-y-2 bg-black/50 rounded-full size-6 p-0.5 cursor-pointer'
              stroke='#fff'
              onClick={() => removeEditUrls([url])}
            />
            <img className='object-cover w-full h-full' src={url} />
          </div>
        ))}
      </div>

      {/* File List */}
      {files.map(file => (
        <div key={file.id} className='rounded-lg border p-3 mt-3'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium'>{file.file.name}</p>
              <p className='text-xs text-muted-foreground'>
                {formatBytes(file.file.size)}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              {file.status === 'uploading' && (
                <Progress value={file.progress} className='h-1 w-32' />
              )}
              {file.status === 'completed' && file.url && (
                <a
                  href={file.url}
                  target='_blank'
                  className='text-xs text-blue-500 underline'
                >
                  View
                </a>
              )}
              {file.status === 'error' && (
                <Button
                  onClick={() => retryUpload(file.id)}
                  size='icon'
                  variant='ghost'
                  type='button'
                >
                  <RefreshCwIcon className='h-4 w-4' />
                </Button>
              )}
              <Button
                onClick={() => removeFile(file.id)}
                size='icon'
                variant='ghost'
                type='button'
              >
                <XIcon className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {file.status === 'error' && (
            <Alert variant='destructive' className='mt-2'>
              <AlertIcon>
                <TriangleAlert className='h-4 w-4' />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Upload failed</AlertTitle>
                <AlertDescription>{file.error}</AlertDescription>
              </AlertContent>
            </Alert>
          )}
        </div>
      ))}
    </div>
  );
}

function getPathFromUrl(url: string) {
  if (!url.length) return '';

  let index = url.indexOf('default/');
  if (index === -1) return '';

  index += 8;

  return url.slice(index);
}
