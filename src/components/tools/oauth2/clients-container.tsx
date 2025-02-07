import type { OAuth2Client } from '@ory/hydra-client';

import { listOAuth2Clients } from '~/server/actions/oauth';

import OAuth2ClientCard from './client-card';

const ClientsContainer: React.FC = async () => {
  const res = await listOAuth2Clients();

  if (!res.success) {
    return <p>Failed to fetch OAuth 2.0 clients</p>;
  }

  return res.data.map((client: OAuth2Client) => (
    <OAuth2ClientCard key={client.client_id} client={client} />
  ));
};

export default ClientsContainer;
