import { type Metadata } from "next";
import Background from "@/components/common/background";
import { Header } from "@/components/common/header";

export const metadata: Metadata = {
  title: "<intania.tech>",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="flex flex-col items-center bg-neutral-900 px-5 text-white md:px-10">
      <Header />
      <main className="mt-16 w-full max-w-screen-xl">{children}</main>
      <Background />
    </body>
  );
}
