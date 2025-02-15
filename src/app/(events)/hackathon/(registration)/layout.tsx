import { headers } from 'next/headers';

import BirdsBackground from '../_components/common/birds-background';
import Building1Background from '../_components/common/bulding-1-background';

const backgroundPathnames = {
  building1: ['/hackathon/login', '/hackathon/ticket'],
  birds: ['/hackathon/registration'],
};

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? '';

  const backgroundKey = Object.keys(backgroundPathnames).find((key) =>
    backgroundPathnames[key as keyof typeof backgroundPathnames].some((path) =>
      pathname.startsWith(path),
    ),
  ) as keyof typeof backgroundPathnames;

  return (
    <main className="px-3">
      {children}
      {backgroundKey === 'building1' ? <Building1Background /> : null}
      {backgroundKey === 'birds' ? <BirdsBackground /> : null}
    </main>
  );
};

export default Layout;
