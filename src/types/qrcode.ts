import { z } from "zod";

export interface QRcodeInterface {
  name: string;
  url: string;
  qrCode: string;
  color: string;
  logo: string | null;
  userId: number;
  id: number;
  editedAt: Date;
}

export const CreateQRCodeInput = z.object({
  name: z.string(),
  url: z.string(),
  qrCode: z.string(),
  color: z.string(),
  logo: z.string(),
  userId: z.string(),
});
