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
import { addCategory } from './action-add';
import { toast } from 'sonner';
import LoadingButton from '@/components/app/LoadingButton';

const CategoriesForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<Category>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: Category) => {
    setLoading(true);

    const { error, data: resData, success } = await addCategory(data);

    if (success) {
      console.log(resData);
      toast.success('Category Added!');
      form.reset();
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
