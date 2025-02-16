import { type Metadata } from 'next'

import Background from '~/components/common/background'
import NavHeader from '~/components/common/navigation/nav-header'

export const metadata: Metadata = {
  title: 'Intania Tech',
  description: '',
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <body className='overflow-x-hidden bg-neutral-900 font-ibm-plex-sans-thai text-white'>
      <main className='flex flex-col items-center'>
        <NavHeader />
        <div className='mt-16 w-full max-w-screen-xl px-5 md:px-10'>
          {children}
        </div>
        <Background />
      </main>
    </body>
  )
}

export default Layout
