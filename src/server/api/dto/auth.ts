import { z } from 'Zod';

export const LoginDto = z.object({
  username: z.string(),
  password: z.string(),
});
