import { notFound } from 'next/navigation';

import { checkAppRole } from '~/server/actions/role';

import Building1Background from '../_components/common/bulding-1-background';

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = async ({
  children,
}) => {
  const resCheck = await checkAppRole({ appId: 'hackathon', role: 'admin' });

  if (!resCheck.success) return notFound();
  return (
    <main className="px-3">
      {children}
      <Building1Background />
    </main>
  );
};

export default Layout;
