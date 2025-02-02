'use client';

import { usePathname } from 'next/navigation';

import { tools } from '~/constants/tools';

const PageTitle: React.FC = () => {
  const pathname = usePathname();

  const tool = tools.find((tool) => tool.href === pathname);

  if (!tool) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="select-none">|</span>
      <h1>{tool.title}</h1>
    </div>
  );
};

export default PageTitle;
