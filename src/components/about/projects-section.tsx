import { Suspense } from "react";
import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";
import ProjectsContainer from "./projects-container";
import ProjectsLoading from "./projects-loading";

export const ProjectsSection = () => {
  return (
    <Section className="gap-6 bg-neutral-950">
      <Title variant="sectionTitle" color="primary" className="text-4xl">
        Our Projects
      </Title>

      <div className="flex w-full flex-col gap-5">
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsContainer />
        </Suspense>
      </div>
    </Section>
  );
};
