'use server'

import { revalidatePath } from 'next/cache'

import { api } from '~/trpc/server'
import { type QrCode } from '~/types/qr-code'
import { type Response } from '~/types/server'

export async function createQrCode({
  name,
  url,
  qrCode,
  color,
  logo,
}: {
  name: string
  url: string
  qrCode: string
  color: string
  logo: string
}): Promise<Response<QrCode>> {
  const res = await api.qrCode.create({
    name,
    url,
    qrCode,
    color,
    logo,
  })

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      errors: res.errors,
    }
  }

  revalidatePath('/tools/qr-code-generator')

  return {
    success: true,
    message: `Successfully created QR: code for ${name}`,
    data: res.data,
  }
}

export async function updateQrCode({
  id,
  name,
  url,
  qrCode,
  color,
  logo,
}: {
  id: number
  name: string
  url: string
  qrCode: string
  color: string
  logo: string
}): Promise<Response<QrCode>> {
  const res = await api.qrCode.update({
    id,
    name,
    url,
    qrCode,
    color,
    logo,
  })

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    }
  }

  revalidatePath('/tools/qr-code-generator')

  return {
    success: true,
    message: `Successfully updated QR code for ${name}`,
    data: res.data,
  }
}

export async function deleteQrCode({
  id,
}: {
  id: string
}): Promise<Response<null>> {
  const res = await api.qrCode.delete({ id })

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      errors: res.errors
        ? res.errors
        : [`Failed to delete QR code with ID:${id}`],
    }
  }

  revalidatePath('/tools/qr-code-generator')

  return {
    success: true,
    message: `Successfully deleted QR code with ID ${id}`,
    data: null,
  }
}
