import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, 'must be atleast 6 character long')
    .max(50, 'cannot exceed 50 chars')
    .regex(/[A-Z]/, 'must contain atleast one uppercase character')
    .regex(/[a-z]/, 'must contain atleast one lowercase character'),
});

export type LoginData = z.infer<typeof loginSchema>;
