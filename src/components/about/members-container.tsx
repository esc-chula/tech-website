import { api } from "@/trpc/server";
import MemberButton from "./member-button";

export const MemberContainer = async () => {
  const members = (await api.aboutMember.get()).data;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {members?.map((member, index) => (
        <MemberButton
          key={index}
          nameTag={member.login}
          url={member.html_url}
          imgLink={member.avatar_url}
        />
      ))}
    </div>
  );
};
