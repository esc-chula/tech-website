import { type Metadata } from "next";
import Background from "@/components/common/background";
import NavHeader from "@/components/common/navigation/nav-header";

export const metadata: Metadata = {
  title: "<intania.tech>",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="flex flex-col items-center overflow-x-hidden bg-neutral-900 text-white">
      <NavHeader />
      <main className="mt-16 w-full max-w-screen-xl px-5 md:px-10">
        {children}
      </main>
      <Background />
    </body>
  );
}
