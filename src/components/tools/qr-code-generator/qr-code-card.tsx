'use client'

import { History } from 'lucide-react'
import Image from 'next/image'

import { Button } from '~/components/ui/button'
import { logoOptions } from '~/constants/qr-code-generator'
import { type QrCode } from '~/types/qr-code'

import DeleteQrCode from './qr-code-delete-dialog'
import EditQrCode from './qr-code-edit-dialog'
import QrCodeLogo from './qr-code-logo'

interface QrCodeCardProps {
  data: QrCode
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({ data }) => {
  const drawRoundedRect = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void => {
    context.beginPath()
    context.moveTo(x + radius, y)
    context.lineTo(x + width - radius, y)
    context.arcTo(x + width, y, x + width, y + radius, radius)
    context.lineTo(x + width, y + height - radius)
    context.arcTo(x + width, y + height, x + width - radius, y + height, radius)
    context.lineTo(x + radius, y + height)
    context.arcTo(x, y + height, x, y + height - radius, radius)
    context.lineTo(x, y + radius)
    context.arcTo(x, y, x + radius, y, radius)
    context.closePath()
  }

  const handleDownloadQrCode = async (): Promise<void> => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      console.error('QrCodeCard, failed to get canvas context.')
      return
    }

    const triggerDownload = (dataUrl: string): void => {
      try {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `${data.name}.png`
        link.click()
      } catch (error) {
        console.error('QrCodeCard, failed to trigger download:', error)
      }
    }

    try {
      // Load QR code image directly from URL
      const qrCodeImage = new window.Image()
      qrCodeImage.crossOrigin = 'anonymous' // Enable cross-origin loading
      qrCodeImage.src = data.qrCode

      await new Promise((resolve) => {
        qrCodeImage.onload = () => {
          // Set canvas size and draw QR code
          canvas.width = qrCodeImage.width
          canvas.height = qrCodeImage.height
          context.drawImage(qrCodeImage, 0, 0)
          resolve(null)
        }
      })

      // If logo exists, process and draw it
      if (data.logo) {
        const logoData = logoOptions.find(
          (logo) => logo.name === data.logo
        )?.data
        if (logoData) {
          const logoImage = new window.Image()
          logoImage.crossOrigin = 'anonymous' // Ensure cross-origin loading
          logoImage.src = logoData

          console.log('logoImage', logoImage.src)

          await new Promise((resolve) => {
            logoImage.onload = () => {
              const boxSize = canvas.width / 6
              const boxX = (canvas.width - boxSize) / 2
              const boxY = (canvas.height - boxSize) / 2

              // Draw the box background
              context.fillStyle = '#fafafa'
              drawRoundedRect(context, boxX, boxY, boxSize, boxSize, 0)
              context.fill()

              // Calculate logo dimensions
              const logoPadding = boxSize * 0.1
              const availableWidth = boxSize - 2 * logoPadding
              const availableHeight = boxSize - 2 * logoPadding

              const widthRatio = availableWidth / logoImage.width
              const heightRatio = availableHeight / logoImage.height
              const scale = Math.min(widthRatio, heightRatio)

              const logoWidth = logoImage.width * scale
              const logoHeight = logoImage.height * scale

              // Center the logo
              const logoX = boxX + (boxSize - logoWidth) / 2
              const logoY = boxY + (boxSize - logoHeight) / 2

              // Draw the logo
              context.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)
              resolve(null)
            }
          })
        }
      }

      // Convert final canvas to data URL and trigger download
      const finalDataUrl = canvas.toDataURL('image/png')
      triggerDownload(finalDataUrl)
    } catch (error) {
      console.error('QrCodeCard, error processing images:', error)
    }
  }

  return (
    <div className='flex h-full w-full max-w-[350px] flex-col gap-6 place-self-center rounded-3xl bg-black p-6 md:min-h-[420px]'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='flex-grow truncate text-xl font-semibold text-primary'>
            {data.name}
          </h3>
          <div className='flex'>
            <EditQrCode data={data} />
            <DeleteQrCode id={data.id.toString()} name={data.name} />
          </div>
        </div>
        <p className='line-clamp-1 w-full truncate text-pretty text-xs text-neutral-500'>
          {data.url}
        </p>
      </div>

      <div className='flex flex-col items-center gap-2 px-[15%]'>
        <div className='relative aspect-square w-full select-none'>
          <Image
            fill
            alt={`${data.name} QR Code`}
            className='object-contain'
            src={data.qrCode}
          />
          <QrCodeLogo logoName={data.logo} />
        </div>
        <div className='flex items-center gap-1 text-neutral-500'>
          <History size={16} />
          <p className='text-xs sm:text-sm'>
            {data.editedAt.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <Button
        className='font-semibold'
        variant='primary'
        onClick={handleDownloadQrCode}
      >
        Download
      </Button>
    </div>
  )
}

export default QrCodeCard
