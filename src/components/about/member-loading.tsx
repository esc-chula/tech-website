import { MemberButton } from "@/components/common/member-button";

export const MembersLoading = async () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {members.map((member, index) => (
        <MemberButton
          key={index}
          nameTag={member.login}
          url={member.html_url}
          imgLink={member.avatar_url}
          loading={true}
        />
      ))}
    </div>
  );
};

const members = [
  { login: "", html_url: "", avatar_url: "" },
  { login: "", html_url: "", avatar_url: "" },
  { login: "", html_url: "", avatar_url: "" },
  { login: "", html_url: "", avatar_url: "" },
  { login: "", html_url: "", avatar_url: "" },
];
