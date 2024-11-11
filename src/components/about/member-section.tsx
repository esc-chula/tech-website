"use client";
import { MemberButton } from "@/components/common/member-button";
import { Section } from "@/components/common/section";
import { Title } from "@/components/common/title";
import { useEffect, useState } from "react";

export const MemberSection = () => {
  const [members, setMembers] = useState<GithubMemberProps[]>([]);
  // const members: GithubMemberProps[] = [];
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        // const { data }: { data: GithubMemberProps[] } = await axios.get(
        //   `https://api.github.com/orgs/esc-chula/public_members`,
        // );
        const response = await fetch(
          `https://api.github.com/orgs/esc-chula/public_members`,
        );

        console.log(response);
        // const data = await response.json();
        // console.log(data);
        setMembers([]);
        // setMembers((members) => {
        //   return [...members, ...data].sort((a, b) =>
        //     a.login.localeCompare(b.login),
        //   );
        // });
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAPI().catch(console.error);
  }, []);

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
          />
        ))}
      </div>
    </Section>
  );
};

interface GithubMemberProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}
