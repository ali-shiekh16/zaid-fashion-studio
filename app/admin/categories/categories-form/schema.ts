import z from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'cannot exceed 255 characters'),

  description: z.string().min(1, 'Description is required'),
});

type Category = z.infer<typeof schema>;

export type { Category };
export default schema;
