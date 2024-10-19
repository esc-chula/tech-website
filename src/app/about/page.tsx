import "@/styles/globals.css";
import { Header } from "../_components/Header";
import { Session } from "../_components/Session";
import { Title } from "../_components/Title";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import { BrowseNow } from "../_components/BrowseNow";
import { ViewRepo } from "../_components/ViewRepo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Member } from "../_components/Member";

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
        <Session>
          <Title titleText="ABOUT" varience="white" />
          <p className="text-center max-sm:text-sm sm:w-[40%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex flex-col items-center justify-center">
            <p>P Poon</p>
            <p>Head of Tech ,ESC67 No 1</p>
          </div>
        </Session>
        <Session className="bg-black">
          <Title titleText="Our Projects" varience="yellow" />

          <div className="flex w-full flex-col-reverse sm:w-[70%] sm:flex-row">
            <div className="mt-4 flex flex-col items-center justify-center space-y-2 sm:w-[50%]">
              <p className="text-xl font-semibold">Orientation Website 67</p>
              <p className="w-[70%] text-center text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <BrowseNow link="/" />
              <ViewRepo link="/" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 sm:w-[50%]">
              <div className="flex h-[270px] w-[90%] items-center justify-center bg-red-300">
                IMAGE
              </div>

              <div className="flex w-[90%] flex-row items-center justify-between">
                <div className="item-center flex cursor-pointer flex-row justify-center space-x-1 transition-all hover:-translate-y-1">
                  <ArrowLeft />
                  <p className="flex items-center text-sm">Previous</p>
                </div>
                <p className="text-sm text-[#FCD34D]">View All Project</p>
                <div className="item-center flex cursor-pointer flex-row justify-center space-x-1 transition-all hover:-translate-y-1">
                  <p className="flex items-center text-sm">Next</p>
                  <ArrowRight />
                </div>
              </div>
            </div>
          </div>
        </Session>

        <Session>
          <Title titleText="Members" varience="yellow" />
          <p className="text-center max-sm:text-sm sm:w-[40%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </p>
          <div className="flex w-[60%] flex-wrap items-center justify-center gap-2">
            {memberTemp.map((member, index) => (
              <Member key={index} nameTag={member} />
            ))}
          </div>
        </Session>
      </body>
    </html>
  );
}

const memberTemp = [
  "Jowkem #2 CEDT",
  "GG #2 CP",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
  "Jowkem #2 CEDT",
];
