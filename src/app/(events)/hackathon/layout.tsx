import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intania Hackathon - The real 48-hour innovation challenge!',
  description:
    'Join Intania Hackathon, The real 48-hour innovation challenge! Build, innovate, and create groundbreaking solutions with top engineering students. Compete, collaborate, and bring your ideas to life! Secure your ticket and be part of the next big innovation made in Intania.',
  creator: 'Engineering Student Committee, Chulalongkorn University',
  keywords: [
    'Intania Hackathon',
    'Thailand Hackathon',
    'Chulalongkorn University Hackathon',
    'Engineering Hackathon Thailand',
    '48-hour hackathon',
    'Tech competition Thailand',
    'Innovate and build',
    'Startup competition Thailand',
    'Student hackathon',
    'Hackathon tickets Thailand',
  ],
  openGraph: {
    title: 'Intania Hackathon - The real 48-hour innovation challenge!',
    description:
      'Join Intania Hackathon, The real 48-hour innovation challenge! Build, innovate, and create groundbreaking solutions with top engineering students. Compete, collaborate, and bring your ideas to life! Secure your ticket and be part of the next big innovation made in Intania.',
    images: {
      type: 'image/jpeg',
      url: '/hackathon/og-image.jpg',
      secureUrl: 'https://intania.tech/hackathon/og-image.jpg',
      alt: 'Intania Hackathon',
      width: 1200,
      height: 750,
    },
  },
  twitter: {
    creator: 'Engineering Student Committee, Chulalongkorn University',
    card: 'summary_large_image',
    title: 'Intania Hackathon - The real 48-hour innovation challenge!',
    description:
      'Join Intania Hackathon, The real 48-hour innovation challenge! Build, innovate, and create groundbreaking solutions with top engineering students. Compete, collaborate, and bring your ideas to life! Secure your ticket and be part of the next big innovation made in Intania.',
    images: {
      type: 'image/jpeg',
      url: '/hackathon/og-image.jpg',
      secureUrl: 'https://intania.tech/hackathon/og-image.jpg',
      alt: 'Intania Hackathon',
      width: 1200,
      height: 750,
    },
  },
  icons: [{ rel: 'icon', url: '/hackathon/favicon.ico' }],
};

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <body className="bg-neutral-900 text-white overflow-x-hidden font-geistSans">
      <h1 className="hidden">
        Intania Hackathon - The real 48-hour Innovation Challenge
      </h1>
      <h2 className="hidden">
        Build, Innovate, and Compete in a Real Hackathon
      </h2>
      <h2 className="hidden">48 Hours of Non-Stop Hacking & Innovation</h2>
      {children}
    </body>
  );
};

export default Layout;
