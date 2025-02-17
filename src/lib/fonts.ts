import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import {
  IBM_Plex_Sans_Thai as IBMPlexSansThai,
  Press_Start_2P as PressStart2P,
} from 'next/font/google'
import localFont from 'next/font/local'

export const ibmPlexSansThai = IBMPlexSansThai({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-thai',
})

export const pressStart2P = PressStart2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-press-start-2p',
})

export const tiny5 = localFont({
  src: '../../public/techmonth/fonts/Tiny5-Regular.ttf',
  variable: '--font-tiny5',
})

export const ndot47 = localFont({
  src: '../../public/hackathon/fonts/ndot-47.ttf',
  variable: '--font-ndot47',
})

export const geistMono = GeistMono
export const geistSans = GeistSans
