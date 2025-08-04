import z from 'zod';

export const schema = z.object({
  password: z
    .string()
    .min(8, 'must be atleast 5 character long')
    .max(50, 'cannot exceed 50 chars')
    .regex(/[A-Z]/, 'must contain atleast one uppercase character')
    .regex(/[a-z]/, 'must contain atleast one lowercase character'),
});
