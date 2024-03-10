import * as z from 'zod';

export const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password is Required and must be at least 8 characters long.',
  }),
});