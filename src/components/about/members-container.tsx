import { getMembers } from '~/server/actions/about';

import MemberButton from './member-button';

const MemberContainer: React.FC = async () => {
  const res = await getMembers();

  if (!res.success) {
    console.error(res.errors);
    return (
      <span className="aspect-[4/2] grid place-content-center text-white/20 select-none">
        Failed to load members. Please try again later.
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {res.data.map((member) => {
        const avatarUrl = new URL(member.avatar_url);

        return (
          <MemberButton
            key={member.id}
            imgLink={avatarUrl.origin + avatarUrl.pathname}
            nameTag={member.login}
            url={new URL(member.html_url).origin}
          />
        );
      })}
    </div>
  );
};

export default MemberContainer;
