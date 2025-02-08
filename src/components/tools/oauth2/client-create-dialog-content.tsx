'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { scopes } from '~/constants/oauth';
import { useToast } from '~/hooks/use-toast';
import { me } from '~/server/actions/auth';
import { createOAuth2Client } from '~/server/actions/oauth';

import { useClientCreateDialog } from './client-create-dialog-context';
import { useClientSecretDialog } from './client-secret-dialog-context';
import MultiInput from './multi-input';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 characters',
    }),
  scope: z.string(),
  redirect_uris: z.array(z.string().url()).nonempty(),
});

const ClientCreateDialogContent: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { setOpen } = useClientCreateDialog();
  const { setOpen: setSecretDialogOpen, setSecret } = useClientSecretDialog();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      scope: 'openid',
      redirect_uris: [''],
    },
  });

  async function createOAuthClient(
    values: z.infer<typeof formSchema>,
  ): Promise<void> {
    const meRes = await me();

    if (!meRes.success) {
      throw new Error('Failed to fetch user information');
    }

    const { studentId } = meRes.data;

    // for more information please see https://www.ory.sh/docs/hydra/reference/api#tag/oAuth2/operation/setOAuth2Client
    const createRes = await createOAuth2Client({
      client_name: values.name,
      scope: values.scope
        .split(' ')
        .map((s) => s.trim())
        .filter((s) => scopes.includes(s))
        .join(' '),
      redirect_uris: values.redirect_uris,
      owner: studentId,

      response_types: ['code'],
      grant_types: ['authorization_code'],
      token_endpoint_auth_method: 'client_secret_basic',
    });

    if (!createRes.success) {
      throw new Error('Failed to create OAuth 2.0 client');
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    if (!createRes.data.client_secret) {
      throw new Error('Client secret not found');
    }

    setSecret(createRes.data.client_secret);
    setSecretDialogOpen(true);
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true);

      await createOAuthClient(values);

      setOpen(false);
      setLoading(false);

      router.refresh();
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: 'Failed to create OAuth 2.0 client',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
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
                    <Input placeholder="Name of your client" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex. openid profile student_id email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please fill in the scope with a space between each scope.
                    <br />
                    <a
                      className="underline"
                      href="https://docs.intania.org/TECH/oauth2/scopes"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Available scopes
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redirect_uris"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URIs</FormLabel>
                  <FormControl>
                    <MultiInput
                      placeholder="Ex. https://intania.org/callback"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.redirect_uris ? (
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500">
                      Please enter a valid URL
                    </p>
                  ) : null}
                </FormItem>
              )}
            />
          </div>

          <DialogDescription>
            Using OAuth 2.0 to infringe on the privacy of others is the
            responsibility of the creator. Engineering Student Committee of
            Chulalongkorn University is not responsible for any misuse of OAuth
            2.0.
          </DialogDescription>
          <DialogDescription>
            After created, client secret will be shown once and cannot be
            retrieved again
          </DialogDescription>

          {/* footer */}
          <DialogFooter>
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
