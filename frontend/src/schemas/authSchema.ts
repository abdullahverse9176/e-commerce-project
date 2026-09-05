import { email, z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  rememberMe: z.boolean().optional(),
});

export const SignUpSchema = z.object({
  name: z.string().min(6, 'Name is required'),
  email: z.string().min(6, 'Email is required').email('Please enter valid email'),
  password: z.string().min(6, 'Email is required')
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof SignUpSchema>;
