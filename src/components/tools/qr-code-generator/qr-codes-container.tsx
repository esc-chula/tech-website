import { api } from '~/trpc/server';
import { type QRcode } from '~/types/qr-code';

import QrCodeCard from './qr-code-card';

const QRCodesContainer: React.FC = async () => {
  const res = await api.qrCode.get();

  if (!res.success) {
    console.error(res.errors);
    return (
      <span className="text-white/20 select-none">
        Failed to fetch QR codes. Please try again later.
      </span>
    );
  }

  return res.data.map((qr: QRcode) => <QrCodeCard key={qr.id} data={qr} />);
};

export default QRCodesContainer;
