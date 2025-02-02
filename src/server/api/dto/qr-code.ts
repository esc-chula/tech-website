import { z } from 'zod';

export const CreateQrCodeDto = z.object({
  name: z.string(),
  url: z.string(),
  qrCode: z.string(),
  color: z.string(),
  logo: z.string(),
});

export const UpdateQrCodeDto = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  qrCode: z.string(),
  color: z.string(),
  logo: z.string(),
});

export const DeleteQrCodeDto = z.object({
  id: z.number(),
});
