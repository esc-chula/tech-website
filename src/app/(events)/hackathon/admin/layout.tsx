import { notFound } from 'next/navigation';

import { checkAppRole } from '~/server/actions/role';

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = async ({
  children,
}) => {
  const resCheck = await checkAppRole({ appId: 'hackathon', role: 'admin' });

  if (!resCheck.success) {
    return notFound();
  }

  return <>{children}</>;
};

export default Layout;
