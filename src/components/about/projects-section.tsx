import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";
import ProjectCard from "./project-card";

export const ProjectsSection = () => {
  return (
    <Section className="gap-6 bg-neutral-950">
      <Title variant="sectionTitle" color="primary" className="text-4xl">
        Our Projects
      </Title>

      <div className="flex w-full flex-col gap-5">
        <h3 className="text-lg font-semibold uppercase">
          ESC67
          <span className="text-sm font-medium normal-case text-neutral-600">
            {" <initiation>"}
          </span>
        </h3>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="Orientation Website 67"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
            image="/assets/mock/banner.png"
            projectLink="https://or67.intania.org"
            githubLink="https://github.com/esc-chula/or67"
          />
        </div>
      </div>
    </Section>
  );
};
