import { api } from '~/trpc/server';
import { type QRcode } from '~/types/qr-code';

import QrCodeCard from './qr-code-card';

const QRCodesContainer: React.FC = async () => {
  const res = await api.qrCode.get();

  if (!res.success) {
    return <p>Failed to load QR codes.</p>;
  }

  return res.data.map((qr: QRcode) => <QrCodeCard key={qr.id} data={qr} />);
};

export default QRCodesContainer;
