import { getMembers } from '~/server/actions/about'

import MemberButton from './member-button'

const MemberContainer: React.FC = async () => {
  const res = await getMembers()

  if (!res.success) {
    console.error('MemberContainer, failed to load members: ', res.errors)
    return (
      <span className='grid aspect-[4/2] select-none place-content-center text-white/20'>
        Failed to load members. Please try again later.
      </span>
    )
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {res.data.map((member) => {
        const avatarUrl = new URL(member.avatar_url)

        return (
          <MemberButton
            key={member.id}
            imgLink={avatarUrl.origin + avatarUrl.pathname}
            nameTag={member.login}
            url={member.html_url}
          />
        )
      })}
    </div>
  )
}

export default MemberContainer
