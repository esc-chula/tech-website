'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, className }) => {
  const [success, setSuccess] = useState(false);

  const copy = async (): Promise<void> => {
    if (success) return;

    try {
      await navigator.clipboard.writeText(value);
      setSuccess(true);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Button
      className={cn(success ? 'cursor-default' : 'cursor-pointer', className)}
      variant="transparent"
      onClick={copy}
    >
      {success ? <Check size={16} /> : <Copy size={16} />}
    </Button>
  );
};

export default CopyButton;
