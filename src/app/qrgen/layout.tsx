export default function QrGenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='bg-neutral-900 px-6 md:px-8 lg:px-12 py-16 w-full min-h-screen'>
      {children}
    </div>
  )
}