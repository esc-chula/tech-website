import { notFound, redirect } from 'next/navigation'

import { getCommunityRegistrationByCode } from '~/server/actions/hackathon'

interface PageProps {
  params: {
    code: string
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { code: communityCode } = params

  const resRegistrationByCode =
    await getCommunityRegistrationByCode(communityCode)

  if (!resRegistrationByCode.success) {
    return notFound()
  }

  if (resRegistrationByCode.data.registration.team) {
    return redirect(`/hackathon/community/${communityCode}/ticket`)
  }

  return redirect(`/hackathon/community/${communityCode}/registration`)
}

export default Page
