'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPassword } from './acion';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { schema } from './schema';
import LoadingButton from '@/components/app/LoadingButton';

export function ResetPassForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);

    const { success, error } = await resetPassword({
      password: values.password,
    });

    if (success) {
      toast.success('Password updated');
      router.replace('/login');
    } else toast.error(error || 'something went wrong');

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <LoadingButton
              type='submit'
              className='w-full cursor-pointer'
              disabled={loading}
              loading={loading}
            >
              Reset Password
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
