'use client'

import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { default as QrCode } from 'qrcode'
import { useEffect, useState } from 'react'

interface TeamTicketQrCodeProps {
  publicId: string
}

const TeamTicketQrCode: React.FC<TeamTicketQrCodeProps> = ({ publicId }) => {
  const [loading, setLoading] = useState(true)
  const [qrCodeData, setQrCodeData] = useState('')

  useEffect(() => {
    const generate = async (): Promise<void> => {
      try {
        setLoading(true)

        const qrCodeGen = await QrCode.toDataURL(publicId, {
          errorCorrectionLevel: 'Q',
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
          width: 1024,
        })
        setQrCodeData(qrCodeGen)
      } catch (error) {
        console.error(
          'QrCodeCreateDialogContent, QR code generation error:',
          error
        )
      }
    }

    generate()
      .catch((error: unknown) => {
        console.error(
          'QrCodeCreateDialogContent, QR code generation error:',
          error
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [publicId])

  return loading ? (
    <LoaderCircle className='animate-spin' size={36} />
  ) : (
    <Image
      fill
      alt='ticket'
      className='pointer-events-none select-none object-contain'
      src={qrCodeData}
    />
  )
}

export default TeamTicketQrCode
