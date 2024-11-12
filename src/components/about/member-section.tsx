import { MemberButton } from "@/components/common/member-button";
import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";
import { api } from "@/trpc/server";

export const MemberSection = async () => {
  const members = await api.aboutMember.get();

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
      <div className="flex flex-wrap items-center justify-center gap-2">
        {members.map((member, index) => (
          <MemberButton
            key={index}
            nameTag={member.login}
            url={member.html_url}
            imgLink={member.avatar_url}
          />
        ))}
      </div>
    </Section>
  );
};
