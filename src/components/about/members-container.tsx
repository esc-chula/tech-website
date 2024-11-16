import { api } from "@/trpc/server";
import MemberButton from "./member-button";

export const MemberContainer = async () => {
  const response = await api.about.getMembers();

  if (!response.success) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {response.data.map((member, index) => (
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
