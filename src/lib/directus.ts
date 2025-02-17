import { createDirectus, rest } from '@directus/sdk'
import { env } from 'next-runtime-env'

import type { Event } from '~/types/techmonth'

const DIRECTUS_URL = env('DIRECTUS_URL') ?? 'http://localhost:8055'

interface Schema {
  Tech_web_techmonth_event: Event
}

const directus = createDirectus<Schema>(DIRECTUS_URL).with(
  rest({
    onRequest: (options) => ({
      ...options,
      headers: {
        ...options.headers,
        'cache-control': 'no-store',
      },
    }),
  })
)

export default directus
