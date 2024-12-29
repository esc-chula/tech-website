import { z } from 'Zod';

export const CreateQrCodeDto = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  qrCode: z.string(),
  color: z.string(),
  logo: z.string(),
  userId: z.string(),
});
