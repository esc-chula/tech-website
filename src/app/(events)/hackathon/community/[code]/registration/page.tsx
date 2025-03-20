import { type Metadata } from 'next'

import CommunityRegistrationForm from '~/app/(events)/hackathon/_components/registration/community-registration-form'
import { HACKATHON_MAX_TEAMS } from '~/constants/hackathon'
import {
  checkCommunityRegistrationCode,
  countHackathonRegistrations,
} from '~/server/actions/hackathon'

import BirdsBackground from '../../../_components/common/birds-background'
import RemoveRegistrationButton from '../../../_components/registration/remove-registration-button'

export const metadata: Metadata = {
  title: 'Intania Hackathon - Community Registration',
}

interface PageProps {
  params: {
    code: string
  }
}

const CommunityRegistrationPage = async ({
  params,
}: PageProps): Promise<React.ReactNode> => {
  const result = await checkCommunityRegistrationCode(params.code)

  if (!result.success || !result.data.valid) {
    return (
      <>
        <div className='flex min-h-dvh flex-col items-center justify-center space-y-2'>
          <h1 className='text-2xl font-semibold'>Invalid Registration</h1>
          <p className='text-sm text-white/60'>
            This registration is not valid.
          </p>
        </div>
        <BirdsBackground />
      </>
    )
  }

  const { code: communityCode } = params

  const resCountRegistrations = await countHackathonRegistrations()
  if (!resCountRegistrations.success) {
    return 'Something went wrong, please try again later...'
  }

  return (
    <>
      <div className='flex min-h-dvh flex-col items-center gap-10 pb-24 pt-8'>
        <div className='flex flex-col items-center gap-2 text-center md:gap-6'>
          <h1 className='text-4xl font-semibold md:text-5xl'>Registration</h1>
          <p className='text-sm text-white/60'>
            Registered teams: {resCountRegistrations.data} /{' '}
            {HACKATHON_MAX_TEAMS}
          </p>
        </div>
        {resCountRegistrations.data >= HACKATHON_MAX_TEAMS ? (
          <>
            <div className='flex max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-white/10 bg-white/10 p-4 text-center backdrop-blur-sm'>
              <p className='text-center text-lg font-semibold text-white'>
                Registration is full for this round.
              </p>
              <p className='text-white/60'>
                Thank you for your interest in Intania Hackathon. Please stay
                tuned for our next event.
                <br />
                :D
              </p>
            </div>
            <RemoveRegistrationButton />
          </>
        ) : (
          <CommunityRegistrationForm
            communityCode={communityCode}
            requiredUniversity={result.data.requiredUniversity}
          />
        )}
      </div>
      <BirdsBackground />
    </>
  )
}

export default CommunityRegistrationPage
