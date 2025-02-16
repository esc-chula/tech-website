import { redirect } from 'next/navigation'

import { findMyRegistration } from '~/server/actions/hackathon'

import Building1Background from '../../../_components/common/bulding-1-background'
import UserBox from '../../../_components/common/user-box'
import ShareStory from '../../../_components/success/share-story'

const Page: React.FC = async () => {
  const resMyRegistration = await findMyRegistration()
  if (!resMyRegistration.success || !resMyRegistration.data) {
    return redirect(
      `/hackathon/login?redirectUrl=/hackathon/registration/success`
    )
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <UserBox />
        <h1 className='text-4xl font-semibold md:text-5xl'>Complete</h1>
        <ShareStory teamNo={23} />
      </div>
      <Building1Background hideHackathonTitle />
    </>
  )
}

export default Page
