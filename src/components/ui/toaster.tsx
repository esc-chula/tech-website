'use client';

import { useEffect, useState } from 'react';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '~/components/ui/toast';
import { useToast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';

export const Toaster = (): React.ReactNode => {
  const { toasts } = useToast();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              '',
              props.variant === 'destructive'
                ? ''
                : 'border border-neutral-800 bg-neutral-950/70 text-white backdrop-blur-lg',
            )}
          >
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? (
                <ToastDescription>{description}</ToastDescription>
              ) : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};
