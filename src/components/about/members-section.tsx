import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { Suspense } from "react";
import { MembersLoading } from "./members-loading";
import { MemberContainer } from "./members-container";

export const MembersSection = async () => {
  return (
    <Section className="gap-6">
      <Title variant="sectionTitle" color="primary" className="text-4xl">
        Members
      </Title>
      <p className="max-w-3xl text-center font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
      <Suspense fallback={<MembersLoading />}>
        <MemberContainer />
      </Suspense>
    </Section>
  );
};
