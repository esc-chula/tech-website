import "@/styles/globals.css";
import { Header } from "../_components/Header";
import { Session } from "../_components/Session";
import { Title } from "../_components/Title";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import { BrowseNow } from "../_components/BrowseNow";
import { ViewRepo } from "../_components/ViewRepo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Member } from "../_components/Member";
import { AboutSession } from "./_components/AboutSession";
import { ProjectsSession } from "./_components/ProjectsSession";
import { MemberSession } from "./_components/MemberSession";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans-thai",
  weight: ["400", "500", "600", "700"],
});

export default function RootHead() {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSansThai.variable}`}>
      <body>
        <Header />
        <AboutSession />
        <ProjectsSession />
        <MemberSession />
      </body>
    </html>
  );
}
