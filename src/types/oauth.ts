import type { OAuth2Client } from '@ory/hydra-client';

export interface CreateOAuth2Client extends OAuth2Client {
  client_id: string;
}
