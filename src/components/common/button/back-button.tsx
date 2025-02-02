'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '~/lib/utils';

interface BackButtonProps {
  href?: string;
  fixed?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ href, fixed }) => {
  const router = useRouter();

  const navigateBack = (): void => {
    if (href) router.push(href);
    else router.back();
  };

  return (
    <button
      type="button"
      className={cn(
        'z-10 flex items-center gap-1.5 md:gap-2',
        fixed ? 'fixed top-24' : 'absolute top-24',
      )}
      onClick={navigateBack}
    >
      <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
      <span className="text-sm font-medium md:text-lg">Back</span>
    </button>
  );
};

export default BackButton;
