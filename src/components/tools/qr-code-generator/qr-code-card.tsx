'use client';

import { History, SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '~/components/ui/button';

import QrCodeLogo from './qr-code-logo';

interface QrCodeCardProps {
  name: string;
  url: string;
  date: string;
  qrCode: string;
  logo: string;
  backgroundColor: string;
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({
  name,
  url,
  date,
  qrCode,
  logo,
  backgroundColor,
}) => {
  const handleDownloadQrCode = (): void => {
    // TODO: downloaded qr code should have icon

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${name}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-6 bg-black p-6 rounded-3xl w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl truncate">{name}</h3>
          <div className="flex gap-3">
            <button type="button">
              <SquarePen size={24} />
            </button>
            <button type="button">
              <Trash2 size={24} />
            </button>
          </div>
        </div>
        <p className="font-semibold text-amber-300 text-sm">{url}</p>
      </div>

      <div className="flex flex-col items-center px-[15%] gap-2">
        <div className="relative w-full aspect-square select-none">
          <Image fill alt={name} className="object-contain" src={qrCode} />
          <QrCodeLogo backgroundColor={backgroundColor} logoName={logo} />
        </div>
        <div className="flex items-center gap-1 text-neutral-500">
          <History size={16} />
          <p className="font-semibold text-sm">{date}</p>
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
