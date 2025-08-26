'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import schema, { Category } from './schema';
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

interface Props {
  defaultValues?: Category;
  id?: number;
  successMessage?: string;
  redirectPath?: string;
  handleAction?: (
    data: Category,
    id?: number
  ) => Promise<{
    success: boolean;
    error?: string | undefined;
    data?: Category | null | undefined;
  }>;
}

const CategoriesForm = ({
  handleAction,
  defaultValues,
  id,
  successMessage,
  redirectPath,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<Category>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      description: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: Category) => {
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

export default CategoriesForm;
