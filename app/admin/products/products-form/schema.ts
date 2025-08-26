import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  description: z.string().min(1, 'Description is required'),

  price: z
    .string()
    .min(1, 'Price is required')
    .refine(val => +val > 0, 'price must be positive'),

  category_id: z
    .number()
    .min(1, 'Category is required')
    .refine(val => +val > 0, 'price must be positive'),

  stock: z
    .string()
    .min(1, 'Stock is required')
    .refine(val => +val > 0, 'price must be positive'),
});

export type ProductInput = z.infer<typeof productSchema>;

export default productSchema;
