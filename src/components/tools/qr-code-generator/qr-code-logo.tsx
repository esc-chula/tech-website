import Image from 'next/image';

import { logoOptions } from '~/constants/qr-code-generator';

interface QrCodeLogoProps {
  logoName: string | null;
  backgroundColor: string;
}

const QrCodeLogo: React.FC<QrCodeLogoProps> = ({
  logoName,
  backgroundColor,
}) => {
  if (!logoName) {
    return null;
  }

  const logo = logoOptions.find((logoOption) => logoOption.name === logoName);

  if (!logo) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="relative select-none flex justify-center items-center p-1 w-1/5 aspect-square">
        <Image
          fill
          alt="Logo"
          className="object-contain p-1"
          src={logo.data}
          style={{ backgroundColor }}
        />
      </div>
    </div>
  );
};

export default QrCodeLogo;
