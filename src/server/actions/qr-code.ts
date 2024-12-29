'use server';

import { revalidatePath } from 'next/cache';

import { api } from '~/trpc/server';
import { type QRcode } from '~/types/qr-code';
import { type Response } from '~/types/server';

export async function createQRCode({
  name,
  url,
  qrCode,
  color,
  logo,
}: {
  name: string;
  url: string;
  qrCode: string;
  color: string;
  logo: string;
}): Promise<Response<QRcode>> {
  const data = {
    name,
    url,
    qrCode,
    color,
    logo,
  };
  const res = await api.qrCode.create(data);

  if (!res.success) {
    return {
      success: false,
      errors: [`Failed to create QR code for ${name}`],
    };
  }

  revalidatePath('/tools/qr-code-generator');

  return {
    success: true,
    message: `Successfully created QR code for ${name}`,
    data: res.data,
  };
}
