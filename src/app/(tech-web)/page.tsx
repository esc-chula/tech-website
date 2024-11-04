import Hero from "@/components/home/hero";
import ToolCard from "@/components/ToolCard";

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-12">
      <Hero />
      <ToolCard />
    </div>
  );
}
