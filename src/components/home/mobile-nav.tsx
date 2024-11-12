import MenuUser from "./menu-user";
import Menu from "./menu";
import { tools } from "@/constants/tools";
import ToolCard from "@/components/tools/tool-card";

export default function MobileNav() {
  return (
    <>
      <MenuUser />
      <Menu />
      <div className="my-8 ml-6 text-2xl font-semibold">Tools & Apps</div>
      <div className="flex w-full flex-col items-center gap-5 px-5">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            image={tool.image}
            href={tool.href}
          />
        ))}
      </div>
    </>
  );
}
