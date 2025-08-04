'use client';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginData, loginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import LoadingButton from '@/components/app/LoadingButton';
import { login } from './action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    const { success, error } = await login(data);
    if (success) {
      toast.success('Login successful');
      form.reset();
      router.replace('/');
    } else {
      toast.error(error, { richColors: true });
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center'>
                          <FormLabel>Password</FormLabel>
                          <Link
                            href='/auth/forgot-password'
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                          >
                            Forgot your password?
                          </Link>
                        </div>
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
                    className='w-full'
                    disabled={loading}
                    loading={loading}
                  >
                    Login
                  </LoadingButton>
                </div>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
