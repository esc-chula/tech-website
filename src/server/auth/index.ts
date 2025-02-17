import { type IntrospectSessionResponse } from '~/generated/intania/auth/account/v1/account'

import { grpc } from './grpc'

export async function getSession(
  sessionId: string
): Promise<IntrospectSessionResponse['session']> {
  const res = await grpc.account.introspectSession({
    sessionId,
  })

  return res.session
}

export async function getOIDCPublicId(sessionId: string): Promise<string> {
  const session = await grpc.account.me({
    sessionId,
  })

  if (!session.account) {
    throw new Error('Unauthorized')
  }

  return session.account.publicId
}
