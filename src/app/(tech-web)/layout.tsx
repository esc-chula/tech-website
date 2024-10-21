import Background from "@/components/background";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "<Intania Tech>",
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
