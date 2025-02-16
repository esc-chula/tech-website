import { type OAuth2Client } from '@ory/hydra-client'

import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import ClientDeleteDialogTrigger from './client-delete-dialog-trigger'
import ClientEditDialogTrigger from './client-edit-dialog-trigger'

interface OAuth2ClientCardProps {
  client: OAuth2Client
}

const OAuth2ClientCard: React.FC<OAuth2ClientCardProps> = ({
  client,
}: OAuth2ClientCardProps) => {
  if (
    !client.client_id ||
    !client.client_name ||
    !client.created_at ||
    !client.redirect_uris
  ) {
    return null
  }

  return (
    <Card>
      <div className='flex justify-between'>
        <h3 className='text-xl font-semibold text-primary'>
          {client.client_name}
        </h3>
        <div className='flex'>
          <ClientEditDialogTrigger data={client} />
          <ClientDeleteDialogTrigger
            id={client.client_id}
            name={client.client_name}
          />
        </div>
      </div>
      <p className='text-xs text-neutral-500 md:text-sm'>
        {new Date(client.created_at).toLocaleString()}
      </p>
      <div className='flex flex-col gap-4 pb-2 pt-4'>
        <div>
          <Label>Client ID</Label>
          <Input className='mt-2' value={client.client_id} />
        </div>
        <div>
          <Label>Scope</Label>
          <Input className='mt-2' value={client.scope} />
        </div>
        <div>
          <Label>Redirect URIs</Label>
          <Input className='mt-2' value={client.redirect_uris.join(', ')} />
        </div>
      </div>
    </Card>
  )
}

export default OAuth2ClientCard
