import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ResetPassForm } from './reset-password-form';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';

const Page = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center space-x-2 mb-2'>
                <MoveLeft size='15' />
                <Link
                  href={'/login'}
                  className='text-xs underline-offset-4 font-semibold'
                >
                  Sign in
                </Link>
              </div>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPassForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
