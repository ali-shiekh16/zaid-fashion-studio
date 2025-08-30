'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PhoneInput from '@/components/commerce-ui/phone-number-input-basic';
import { addressFormSchema, AddressFormValues } from './schema';
import LoadingButton from '@/components/app/LoadingButton';
import { placeOrder } from './action';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCart } from '@/lib/stores/cart-store/use-cart';
import { useRouter } from 'next/navigation';

export type AddressFormProps = {
  value?: AddressFormValues;
  className?: string;
};

function AddressForm({ className = '', value }: AddressFormProps) {
  const items = useCart(c => c.items);
  const clearCart = useCart(c => c.clearCart);

  const form = useForm<AddressFormValues>({
    defaultValues: value || {
      address1: '',
      address2: '',
      city: '',
      country: '',
      email: '',
      name: '',
      isBillingAddress: true,
      phone: '',
      postalCode: '',
      state: '',
    },
    mode: 'onChange',
    resolver: zodResolver(addressFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AddressFormValues) => {
    if (!items.length)
      return toast.error('Your cart is empty!', { richColors: true });

    setLoading(true);

    const { error, success } = await placeOrder({
      ordersAddress: data,
      orderItems: items,
    });

    if (!success)
      toast.error(error || 'Something went wrong!', { richColors: true });
    else {
      toast.success('Order Placed!');
      clearCart();
      form.reset();
      router.replace('/products');
    }

    setLoading(false);
  };

  return (
    <Accordion type='single' collapsible defaultValue='address-form'>
      <AccordionItem value='address-form'>
        <Card>
          <CardHeader>
            <AccordionTrigger className='cursor-pointer m-0 p-0'>
              <CardTitle>Shipping Address</CardTitle>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent className='m-0 p-0'>
            <CardContent>
              <Form {...form}>
                <form
                  className={className}
                  onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
                >
                  <div className='grid gap-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              autoComplete='get-name'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='address1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              autoComplete='address-line1'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='address2'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Apartment, suite, etc. (optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              autoComplete='address-line2'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex flex-wrap gap-4'>
                      <div className='min-w-[120px] flex-1'>
                        <FormField
                          control={form.control}
                          name='city'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={loading}
                                  autoComplete='address-level2'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='min-w-[120px] flex-1'>
                        <FormField
                          control={form.control}
                          name='state'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={loading}
                                  autoComplete='address-level1'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='min-w-[120px] flex-1'>
                        <FormField
                          control={form.control}
                          name='postalCode'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={loading}
                                  autoComplete='postal-code'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              autoComplete='country'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <PhoneInput
                              {...field}
                              disabled={loading}
                              // autoComplete='tel'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              autoComplete='email'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                control={form.control}
                name='isBillingAddress'
                render={({ field }) => (
                  <FormItem className='flex'>
                    <FormControl>
                      <Checkbox
                        name={field.name}
                        checked={field.value ?? false}
                        onCheckedChange={value => {
                          field.onChange(value);
                        }}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormLabel>Same for Billing Address</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                    <p className='text-sm font-semibold'>
                      Note: We only support cash-on delivery at the moment.
                    </p>

                    <LoadingButton
                      type='submit'
                      disabled={loading}
                      loading={loading}
                      className='mt-2 w-full'
                    >
                      Place Order
                    </LoadingButton>
                  </div>
                </form>
              </Form>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}

export default AddressForm;
