import { createEnv } from '@t3-oss/env-nextjs';
import { env as runtimeEnv } from 'next-runtime-env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    DIRECTUS_URL: z.string().url(),
    GRPC_ADDRESS: z.string(),
    HYDRA_ADMIN_URL: z.string().url(),
    HACKATHON_TICKET_EXPIRY_DAYS: z.string(),
    HACKATHON_MAX_TEAMS: z.string(),
    REDIS_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_GTAG_ID: z.string().optional(),
    NEXT_PUBLIC_SHORTENED_LINK_ORIGIN: z.string().optional(),
  },

  runtimeEnv: {
    // server
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    GRPC_ADDRESS: process.env.GRPC_ADDRESS,
    HYDRA_ADMIN_URL: process.env.HYDRA_ADMIN_URL,
    HACKATHON_TICKET_EXPIRY_DAYS: process.env.HACKATHON_TICKET_EXPIRY_DAYS,
    HACKATHON_MAX_TEAMS: process.env.HACKATHON_MAX_TEAMS,
    REDIS_URL: process.env.REDIS_URL,
    // client
    NEXT_PUBLIC_GTAG_ID: runtimeEnv('NEXT_PUBLIC_GTAG_ID'),
    NEXT_PUBLIC_SHORTENED_LINK_ORIGIN: runtimeEnv(
      'NEXT_PUBLIC_SHORTENED_LINK_ORIGIN',
    ),
  },

  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),

  emptyStringAsUndefined: true,
});
