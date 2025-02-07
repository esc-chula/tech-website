import type { OAuth2Client } from '@ory/hydra-client';

import { listOAuth2Clients } from '~/server/actions/oauth';

import OAuth2ClientCard from './client-card';
import ClientCreateDialogTrigger from './client-create-dialog-trigger';

const ClientsContainer: React.FC = async () => {
  const res = await listOAuth2Clients();

  if (!res.success) {
    return <p>Failed to fetch OAuth 2.0 clients</p>;
  }

  if (!res.data.length) {
    return <ClientCreateDialogTrigger variant="card" />;
  }

  return res.data.map((client: OAuth2Client) => (
    <OAuth2ClientCard key={client.client_id} client={client} />
  ));
};

export default ClientsContainer;
