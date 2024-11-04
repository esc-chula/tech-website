import Hero from "@/components/home/hero";
import ToolList from "@/components/tools/tool-list";

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center gap-10 pb-24 pt-12">
      <h1 className="hidden">ESC Technology Department Website</h1>
      <Hero />
      <ToolList />
    </div>
  );
}
