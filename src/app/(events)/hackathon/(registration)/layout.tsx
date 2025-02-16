const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return <main className='px-3'>{children}</main>
}

export default Layout
