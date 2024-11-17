import type { ReactNode } from 'react';

import { cn } from '~/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const classNameWithBg = cn(
    className?.split(' ').filter((c) => c.startsWith('bg-')),
  );
  const classNameWithoutBg = cn(
    className?.split(' ').filter((c) => !c.startsWith('bg-')),
  );

  return (
    <section className="relative h-full w-full py-10">
      <div
        className={cn(
          'z-50 flex h-full flex-col items-center',
          classNameWithoutBg,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute -left-[50vw] -right-[50vw] bottom-0 top-0 -z-10 h-full',
          classNameWithBg,
        )}
      />
    </section>
  );
};
