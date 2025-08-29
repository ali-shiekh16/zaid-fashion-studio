import z from 'zod';

export const addressFormSchema = z.object({
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  email: z.email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  state: z.string().min(1, 'State is required'),
  isBillingAddress: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
