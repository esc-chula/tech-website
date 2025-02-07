'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { useClientCreateDialog } from './client-create-dialog-context';
import { createOAuth2Client } from '~/server/actions/oauth';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 characters',
    }),
});

const ClientCreateDialogContent: React.FC = () => {
  const { setOpen } = useClientCreateDialog();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function createOauthClient(values: z.infer<typeof formSchema>) {
    // for more information please see https://www.ory.sh/docs/hydra/reference/api#tag/oAuth2/operation/setOAuth2Client
    const create = await createOAuth2Client({
      // Redirect URI for relying party.
      redirect_uris: ['http://127.0.0.1:9090/callback'],
      // Scope which relying party wish to use, space separated scope, important scopes are openid and email
      scope: 'openid email',
      // Flow they supported.
      response_types: ['code', 'token', 'id_token', 'code token', 'token id_token', 'code id_token', 'code token id_token'],
      grant_types: ['authorization_code'],
      owner: '6530000021',
      client_name: values.name,
      token_endpoint_auth_method: 'client_secret_post',
    });

    if (create.success) {
      console.log({ huh: create.data })
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true);

      await createOauthClient(values);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DialogContent className="md:max-w-md">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* header */}
          <DialogHeader>
            <DialogTitle>Create OAuth 2.0 Client</DialogTitle>
          </DialogHeader>

          {/* form */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My QR Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* footer */}
          <DialogFooter>
            <DialogDescription>After created, client secret will be shown once and cannot be retrieved again</DialogDescription>
            <Button disabled={loading} type="submit" variant="primary">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ClientCreateDialogContent;
