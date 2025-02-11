'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import MultiInput from '~/components/ui/multi-input';
import { scopes } from '~/constants/oauth';
import { useToast } from '~/hooks/use-toast';
import { updateOAuth2Client } from '~/server/actions/oauth';

import { useClientEditDialog } from './client-edit-dialog-context';

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

const ClientEditDialogContent: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { setOpen, data } = useClientEditDialog();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      scope: 'openid',
      redirect_uris: [''],
    },
  });

  async function editOAuthClient(
    values: z.infer<typeof formSchema>,
  ): Promise<void> {
    if (!data.client_id) {
      throw new Error('Invalid client ID');
    }

    const res = await updateOAuth2Client(data.client_id, {
      client_name: values.name,
      scope: values.scope
        .split(' ')
        .map((s) => s.trim())
        .filter((s) => scopes.includes(s))
        .join(' '),
      redirect_uris: values.redirect_uris,
    });

    if (!res.success) {
      throw new Error('Failed to create OAuth 2.0 client');
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true);

      await editOAuthClient(values);

      setOpen(false);
      setLoading(false);

      router.refresh();
    } catch (error) {
      setLoading(false);

      console.error(
        'ClientEditDialogContent, failed to edit OAuth 2.0 client: ',
        error,
      );
      toast({
        title: 'Failed to create OAuth 2.0 client',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  useEffect(() => {
    if (
      data.client_id &&
      data.client_name &&
      data.scope &&
      data.redirect_uris
    ) {
      form.setValue('name', data.client_name);
      form.setValue('scope', data.scope);
      if (data.redirect_uris.length === 0) {
        form.setValue('redirect_uris', ['']);
      } else {
        form.setValue(
          'redirect_uris',
          data.redirect_uris as [string, ...string[]],
        );
      }
    }
  }, [data, form]);

  return (
    <DialogContent className="md:max-w-md">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* header */}
          <DialogHeader>
            <DialogTitle>Edit OAuth 2.0 Client</DialogTitle>
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

export default ClientEditDialogContent;
