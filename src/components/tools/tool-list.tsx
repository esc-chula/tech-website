import { tools } from "@/constants/tools";
import ToolCard from "./tool-card";

export default function ToolList() {
  return (
    <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard
          key={tool.title}
          title={tool.title}
          description={tool.description}
          href={tool.href}
          image={tool.image}
        />
      ))}
    </div>
  );
}
