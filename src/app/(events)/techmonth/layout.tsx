import { type Metadata } from 'next'

import Background from './_components/background'

export const metadata: Metadata = {
  title: 'Intania Tech Month 2024',
  description:
    'เดือนแห่งการเรียนรู้และสร้างสรรค์เทคโนโลยีจากชมรม TECH ใน INTANIA',
  icons: [{ rel: 'icon', url: '/techmonth/favicon.ico' }],
}

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <body className='bg-techmonth-black text-techmonth-white'>
      {children}
      <Background />
    </body>
  )
}

export default Layout
