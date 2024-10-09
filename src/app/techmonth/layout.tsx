import "@/styles/globals.css";

import { type Metadata } from "next";

import Background from "./_components/background";
import Navigation from "./_components/navigation";

export const metadata: Metadata = {
  title: "Intania Tech Month 2024",
  description:
    "เดือนแห่งการเรียนรู้และสร้างสรรค์เทคโนโลยีจากชมรม TECH ใน INTANIA",
  icons: [{ rel: "icon", url: "/techmonth/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-techmonth-black text-techmonth-white">
      <Navigation />
      <main className="-mt-[calc(100vh-14px)] flex w-full flex-col items-center">
        {children}
      </main>
      <Background />
    </body>
  );
}
