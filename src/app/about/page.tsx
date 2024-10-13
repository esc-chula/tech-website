import "@/styles/globals.css";
import { Header } from "../_components/Header";
import { Session } from "../_components/Session";
import { Title } from "../_components/Title";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";

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
      <Header />
      <Session>
        <Title titleText="ABOUT" varience="white" />
        <p className="text-center max-sm:text-sm sm:w-[40%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
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
          <div className="flex flex-col items-center justify-center space-y-1 sm:w-[50%]">
            <p className="text-xl font-semibold">Orientation Website 67</p>
            <p className="w-[70%] text-center text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p>P Poon</p>
          <p>Head of Tech ,ESC67 No 1</p>
        </div>
      </Session>
    </html>
  );
}
