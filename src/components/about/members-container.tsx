import { api } from '~/trpc/server';

import MemberButton from './member-button';

const MemberContainer: React.FC = async () => {
  const response = await api.about.getMembers();

  if (!response.success) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {response.data.map((member) => (
        <MemberButton
          key={member.id}
          imgLink={member.avatar_url}
          nameTag={member.login}
          url={member.html_url}
        />
      ))}
    </div>
  );
};

export default MemberContainer;
