import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intania Hackathon',
};

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <body className="bg-neutral-900 text-white overflow-x-hidden font-geistSans">
      {children}
    </body>
  );
};

export default Layout;
