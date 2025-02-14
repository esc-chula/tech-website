import { z } from 'zod';

export const LoginDto = z.object({
  username: z.string(),
  password: z.string(),
});

export const MeDto = z.object({
  sessionId: z.string(),
});
