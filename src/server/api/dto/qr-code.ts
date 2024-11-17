import { z } from 'Zod';

export const CreateQrCodeDto = z.object({
  name: z.string(),
  url: z.string(),
  qrCode: z.string(),
  color: z.string(),
  logo: z.string(),
  userId: z.string(),
});
