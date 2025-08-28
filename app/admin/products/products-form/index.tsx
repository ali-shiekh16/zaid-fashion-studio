'use client';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import schema, { ProductInput } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import LoadingButton from '@/components/app/LoadingButton';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/lib/data/categories/use-categories';
import { Combobox } from '@/components/ui/combobox';
import { Skeleton } from '@/components/ui/skeleton';
import ProgressUpload from '@/components/progress-upload';

interface Props {
  defaultValues?: ProductInput;
  id?: number;
  successMessage?: string;
  redirectPath?: string;
  handleAction?: (
    data: ProductInput,
    id?: number
  ) => Promise<{
    success: boolean;
    error?: string | undefined;
    data?: ProductInput | null | undefined;
  }>;
}

const ProductsForm = ({
  handleAction,
  defaultValues,
  id,
  successMessage,
  redirectPath,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [editUrls, setEditUrls] = useState<string[]>(
    defaultValues?.images || []
  );
  const { isFetched, data: categories } = useCategories();

  const form = useForm<ProductInput>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      description: '',
      price: '',
      category_id: '',
      stock: '',
      images: [],
    },
  });

  const router = useRouter();

  // Sync editUrls with react-hook-form on mount
  useEffect(() => {
    if (editUrls.length > 0) {
      const images = form.getValues('images');
      const editImages = editUrls.filter(url => !images.includes(url));
      form.setValue('images', editImages, { shouldValidate: true });
    }
  }, [editUrls, form]);

  const onSubmit = async (data: ProductInput) => {
    if (!handleAction) return;

    setLoading(true);

    const { error, success } = await handleAction(data, id);

    if (success) {
      toast.success(successMessage || 'Done!');

      if (redirectPath) router.replace(redirectPath);

      form.reset({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock: '',
        images: [],
      });

      setResetKey(prev => prev + 1);
    } else
      toast.error(error || 'Something went wrong, try again.', {
        richColors: true,
      });

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md:grid md:grid-cols-2 md:gap-x-5 space-y-5 md:space-y-0'>
          <div className='space-y-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <FormControl>
                    {isFetched && categories ? (
                      <Combobox
                        emptyMessage='There are no categories'
                        placeholder='Select Category'
                        searchPlaceholder='Search Category'
                        value={field.value}
                        onChange={field.onChange}
                        options={categories?.map(c => ({
                          label: c.name,
                          value: String(c.id),
                        }))}
                      />
                    ) : (
                      <Skeleton className='w-52 h-10' />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className='min-h-52' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-2'>Images</FormLabel>
                  <ProgressUpload
                    bucket='default'
                    accept='image/*'
                    maxFiles={10}
                    maxSize={5 * 1024 * 1024} // 5 MB
                    multiple={true}
                    onAllRemove={() => form.setValue('images', [])}
                    onFileAdd={image => {
                      const prevImages =
                        form.getValues('images') || ([] as string[]);

                      const urls = [...editUrls, ...prevImages, image];

                      // console.log(urls, 'on file add form');

                      field.onChange([...new Set(urls)]);
                    }}
                    onFileRemove={val => {
                      const prevImages: string[] =
                        form.getValues('images') || [];

                      const newImages: string[] =
                        prevImages.filter(url => url !== val) || [];

                      // console.log(newImages, 'on file add form')

                      field.onChange(newImages);
                    }}
                    resetKey={resetKey}
                    editUrls={editUrls}
                    setEditUrls={(urls: string[]) => setEditUrls(urls)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex justify-end mt-2'>
          <LoadingButton
            loading={loading}
            disabled={loading}
            className='cursor-pointer'
            type='submit'
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ProductsForm;
