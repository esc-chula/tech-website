import { MemberButton } from "@/components/common/member-button";
import { api } from "@/trpc/server";

export const MemberContainer = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const members = await api.aboutMember.get();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {members.map((member, index) => (
        <MemberButton
          key={index}
          nameTag={member.login}
          url={member.html_url}
          imgLink={member.avatar_url}
          loading={false}
        />
      ))}
    </div>
  );
};
