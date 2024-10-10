import "@/styles/globals.css";
import { Header } from "../_components/Header";

import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";

const inter = Inter({ 
    subsets: ['latin'], 
    variable: '--font-inter' })

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    subsets: ['latin'],
    variable: '--font-ibm-plex-sans-thai',
    weight: ['400', '500', '600', '700']})

export default function RootHead() {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSansThai.variable}`}>
      <Header />
    </html>
  );
}
