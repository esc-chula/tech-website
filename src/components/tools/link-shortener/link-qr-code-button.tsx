import { QrCode } from 'lucide-react'

import { Button } from '~/components/ui/button'

const LinkQrCodeButton: React.FC = () => {
  // TODO: create qr code integration
  return (
    <Button variant='transparent'>
      <QrCode size={16} />
    </Button>
  )
}

export default LinkQrCodeButton
