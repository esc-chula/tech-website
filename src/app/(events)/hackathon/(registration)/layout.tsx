import Building1Background from '../_components/common/bulding-1-background';

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <main className="px-3">
      {children}
      <Building1Background />
    </main>
  );
};

export default Layout;
