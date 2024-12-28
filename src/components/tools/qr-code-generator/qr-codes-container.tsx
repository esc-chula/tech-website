import { me } from '~/server/actions/auth';
import { api } from '~/trpc/server';
import { type QRcode } from '~/types/qr-code';

import QrCodeCard from './qr-code-card';

const QRCodesContainer: React.FC = async () => {
  const user = await me();
  if (!user.success) {
    return <p>Failed to load user.</p>;
  }
  console.log(user.data.id.toString());

  const res = await api.qrCode.get({ userId: user.data.id.toString() });

  if (res.error) {
    return <p>Failed to load QR codes.</p>;
  }

  return <QrCodeCard data={res.data as QRcode} />;
};

export default QRCodesContainer;
