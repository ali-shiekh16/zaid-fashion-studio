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
  const { isFetched, data: categories } = useCategories();

  useEffect(() => {
    console.log(categories);
  }, [isFetched]);

  const form = useForm<ProductInput>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      description: '',
      price: '',
      category_id: 0,
      stock: '',
    },
  });

  const router = useRouter();

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
      });
    } else toast.error(error || 'Something went wrong, try again.');

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md:grid md:grid-cols-2 md:gap-x-5'>
          <div>
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
                        value={String(field.value)}
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
            <FormLabel className='mb-2'>Images</FormLabel>
            <ProgressUpload
              bucket='default'
              accept='image/*'
              maxFiles={10}
              maxSize={5 * 1024 * 1024} // 5 MB
              multiple={true}
              onUploadComplete={files => {
                console.log('✅ Uploaded files:', files);
                // files = [{ url: "https://xyz.supabase.co/storage/v1/object/public/avatars/profile-pics/uuid-filename.png", name: "filename.png" }]
              }}
            />
          </div>
        </div>

        <div className='flex justify-end'>
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
