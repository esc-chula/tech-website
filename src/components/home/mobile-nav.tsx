import MenuUser from "./menu-user";
import Menu from "./menu";
import { tools } from "@/constants/tools";
import { ToolCards } from "./tool-card";

export default function MobileNav() {
  return (
    <>
      <MenuUser />
      <Menu />
      <div className="my-8 ml-6 text-2xl font-semibold">Tools & Apps</div>
      <div className="flex w-full flex-col items-center">
        {tools.map((tool) => (
          <ToolCards
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
