import z from 'zod';

export const signupSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, 'must be atleast 6 character long')
      .max(50, 'cannot exceed 50 chars')
      .regex(/[A-Z]/, 'must contain atleast one uppercase character')
      .regex(/[a-z]/, 'must contain atleast one lowercase character'),

    confirmPass: z.string(),
  })
  .refine(({ password, confirmPass }) => password === confirmPass, {
    message: "Passwords don't match",
    path: ['confirmPass'],
  });

export type SignupData = z.infer<typeof signupSchema>;
