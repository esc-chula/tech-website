import { HydrateClient } from "@/trpc/server";
import Banner from "@/components/Banner";
import ToolCard from "@/components/ToolCard";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-screen items-center justify-center bg-[#161616] pl-40 pr-40">
        <div className="h-1/2 w-full">
          <Banner />
          <ToolCard />
        </div>
      </main>
    </HydrateClient>
  );
}
