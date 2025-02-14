import Redis from 'ioredis';

import { env } from '~/env';

const redis = new Redis(env.REDIS_URL);

export default redis;
