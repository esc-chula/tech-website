export default function QrGenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full min-h-screen py-16 px-6 md:px-8 lg:px-12 bg-neutral-900'>
      {children}
    </div>
  )
}