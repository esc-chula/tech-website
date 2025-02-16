import { api } from '~/trpc/server'
import { type QrCode } from '~/types/qr-code'

import QrCodeCard from './qr-code-card'

const QrCodesContainer: React.FC = async () => {
  const res = await api.qrCode.get()

  if (!res.success) {
    console.error('QrCodesContainer, failed to fetch QR codes: ', res.errors)
    return (
      <span className='select-none text-white/20'>
        Failed to fetch QR codes. Please try again later.
      </span>
    )
  }

  return res.data.map((qr: QrCode) => <QrCodeCard key={qr.id} data={qr} />)
}

export default QrCodesContainer
