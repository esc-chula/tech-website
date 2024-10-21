import { type Metadata } from "next";
import Background from "@/components/common/background";

export const metadata: Metadata = {
  title: "<intania.tech>",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="flex justify-center bg-neutral-900 px-5 text-white md:px-10">
      <main className="w-full max-w-screen-xl">{children}</main>
      <Background />
    </body>
  );
}
