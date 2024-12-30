'use client';

import { History } from 'lucide-react';
import Image from 'next/image';

import { Button } from '~/components/ui/button';
import { logoOptions } from '~/constants/qr-code-generator';
import { type QRcode } from '~/types/qr-code';

import DeleteQRCode from './qr-code-delete-dialog';
import EditQRCode from './qr-code-edit-dialog';
import QrCodeLogo from './qr-code-logo';

interface QrCodeCardProps {
  data: QRcode;
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({ data }) => {
  const handleDownloadQrCode = (): void => {
    // Create a canvas element and its context for drawing
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas context.');
      return;
    }

    // Load QR code image
    const qrCodeImage = new window.Image();
    qrCodeImage.crossOrigin = 'anonymous'; // Enable cross-origin for downloaded images
    qrCodeImage.src = data.qrCode;

    qrCodeImage.onload = () => {
      // Set canvas size to match QR code dimensions
      canvas.width = qrCodeImage.width;
      canvas.height = qrCodeImage.height;
      context.drawImage(qrCodeImage, 0, 0);

      // Draw a styled box for the logo
      if (data.logo) {
        const logoImage = new window.Image();
        logoImage.crossOrigin = 'anonymous'; // Enable cross-origin for downloaded images
        const logoData =
          logoOptions.find((logo) => logo.name === data.logo)?.data ?? '';
        logoImage.src = logoData;

        logoImage.onload = () => {
          // Calculate logo box dimensions and position
          const boxSize = canvas.width / 6;
          const boxX = (canvas.width - boxSize) / 2;
          const boxY = (canvas.height - boxSize) / 2;

          // Draw the box with background color and border radius
          context.fillStyle = '#fafafa'; // Box background color
          context.strokeStyle = 'none'; // Optional border color
          context.beginPath();
          context.roundRect(boxX, boxY, boxSize, boxSize, 0); // Rounded corners
          context.fill();

          // Draw the logo inside the box
          const logoPadding = boxSize * 0.1; // Padding inside the box
          const availableWidth = boxSize - 2 * logoPadding;
          const availableHeight = boxSize - 2 * logoPadding;

          // Calculate the logo dimensions while maintaining aspect ratio
          let logoWidth = logoImage.width;
          let logoHeight = logoImage.height;

          const widthRatio = availableWidth / logoWidth;
          const heightRatio = availableHeight / logoHeight;
          const scale = Math.min(widthRatio, heightRatio);

          logoWidth *= scale;
          logoHeight *= scale;

          // Center the logo within the box
          const logoX = boxX + (boxSize - logoWidth) / 2;
          const logoY = boxY + (boxSize - logoHeight) / 2;

          // Draw the logo on the canvas
          context.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

          // Trigger download
          triggerDownload();
        };

        logoImage.onerror = () => {
          console.error('Failed to load logo image.');
          triggerDownload(); // Proceed without the logo if it fails to load
        };
      } else {
        // Trigger download if no logo exists
        triggerDownload();
      }
    };

    qrCodeImage.onerror = () => {
      console.error('Failed to load QR code image.');
    };

    const triggerDownload = (): void => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${data.name}.png`;
      link.click();
    };
  };

  return (
    <div className="flex flex-col gap-6 bg-black p-6 rounded-3xl w-full max-w-[350px] place-self-center md:min-h-[420px] h-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="flex-grow font-semibold text-amber-300 text-xl truncate">
            {data.name}
          </h3>
          <div className="flex">
            <EditQRCode data={data} />
            <DeleteQRCode id={data.id.toString()} name={data.name} />
          </div>
        </div>
        <p className="text-xs text-neutral-500 line-clamp-1 w-full text-pretty truncate">
          {data.url}
        </p>
      </div>

      <div className="flex flex-col items-center px-[15%] gap-2">
        <div className="relative w-full aspect-square select-none">
          <Image
            fill
            alt={`${data.name} QR Code`}
            className="object-contain"
            src={data.qrCode}
          />
          <QrCodeLogo logoName={data.logo} />
        </div>
        <div className="flex items-center gap-1 text-neutral-500">
          <History size={16} />
          <p className="text-xs sm:text-sm">
            {data.editedAt.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <Button
        className="font-semibold"
        variant="primary"
        onClick={handleDownloadQrCode}
      >
        Download
      </Button>
    </div>
  );
};

export default QrCodeCard;
