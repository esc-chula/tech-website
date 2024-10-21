import Background from "@/components/background";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Intania Tech",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-neutral-900 text-white">
      <Background />
      {children}
    </body>
  );
}
