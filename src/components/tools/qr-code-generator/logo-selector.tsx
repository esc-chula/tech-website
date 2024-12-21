import { X } from 'lucide-react';
import Image from 'next/image';

import { Label } from '~/components/ui/label';
import { logoOptions } from '~/constants/qr-code-generator';
import { cn } from '~/lib/utils';

interface LogoSelectorProps {
  title: string;
  logo: { name: string; data: string } | null;
  setLogo: (logo: { name: string; data: string } | null) => void;
}

const LogoSelector: React.FC<LogoSelectorProps> = ({
  title,
  logo,
  setLogo,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{title}</Label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            'w-8 aspect-square grid place-content-center rounded-full text-neutral-400',
            !logo && 'ring-2 ring-neutral-300',
          )}
          onClick={() => setLogo(null)}
        >
          <X />
        </button>
        {logoOptions.map((logoOption) => (
          <button
            key={logoOption.name}
            type="button"
            className={cn(
              'w-8 aspect-square p-2 rounded-full overflow-hidden',
              logoOption.name === logo?.name && 'ring-2 ring-neutral-300',
            )}
            onClick={() => setLogo(logoOption)}
          >
            <div className="relative w-full h-full">
              <Image
                fill
                alt={logoOption.name}
                className="object-contain"
                src={logoOption.data}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogoSelector;
