import "esc-ui/css";
import { api, HydrateClient } from "@/trpc/server";
import Banner from "@/components/Banner";
import ToolCard from "@/components/ToolCard";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <HydrateClient>
      <main className="h-screen items-center justify-center pl-40 pr-40 bg-[#161616]">
        <div className="w-full h-1/2">
        <Banner/>
        <ToolCard/>
        </div>
      </main>
    </HydrateClient>
  );
}
