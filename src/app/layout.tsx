import '~/styles/globals.css'

import Script from 'next/script'
import { PublicEnvScript } from 'next-runtime-env'

import { Toaster } from '~/components/ui/toaster'
import { env } from '~/env'
import {
  geistMono,
  geistSans,
  ibmPlexSansThai,
  ndot47,
  pressStart2P,
  tiny5,
} from '~/lib/fonts'
import { cn } from '~/lib/utils'
import { TRPCReactProvider } from '~/trpc/react'

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  return (
    <html
      lang='en'
      className={cn(
        ibmPlexSansThai.variable,
        pressStart2P.variable,
        tiny5.variable,
        ndot47.variable,
        geistMono.variable,
        geistSans.variable
      )}
    >
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            env.NEXT_PUBLIC_GTAG_ID ?? ''
          }`}
        />
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${env.NEXT_PUBLIC_GTAG_ID ?? ''}');
          `}
        </Script>
        <PublicEnvScript />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
