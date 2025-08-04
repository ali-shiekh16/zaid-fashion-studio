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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { sendResetPassEmail } from './action';
import LoadingButton from '@/components/app/LoadingButton';

const schema = z.object({ email: z.email() });

export function ForgotPassForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);

    const { success, error } = await sendResetPassEmail(values);
    if (success) {
      form.reset();
      toast.success('We have sent you an email');
    } else toast.error(error || 'Something went wrong');

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='m@example.com' />
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
              Send Link
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
