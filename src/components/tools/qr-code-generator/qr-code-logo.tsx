import Image from 'next/image'

import { logoOptions } from '~/constants/qr-code-generator'

interface QrCodeLogoProps {
  logoName: string | null
}

const QrCodeLogo: React.FC<QrCodeLogoProps> = ({ logoName }) => {
  if (!logoName) {
    return null
  }

  const logo = logoOptions.find((logoOption) => logoOption.name === logoName)

  if (!logo) {
    return null
  }

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative flex aspect-square w-1/6 select-none items-center justify-center p-1'>
        <Image
          fill
          alt='Logo'
          className='object-contain p-1'
          src={logo.data}
          style={{ backgroundColor: '#fafafa' }}
        />
      </div>
    </div>
  )
}

export default QrCodeLogo
