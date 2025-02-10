import { z } from 'zod';

export const RoleCheckDto = z.object({
  appId: z.string(),
  role: z.string(),
});
