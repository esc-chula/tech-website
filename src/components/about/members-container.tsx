import { api } from '~/trpc/server';

import MemberButton from './member-button';

const MemberContainer: React.FC = async () => {
  const response = await api.about.getMembers();

  if (!response.success) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {response.data.map((member) => {
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
