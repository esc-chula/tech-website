'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  DialogContent,
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
import { env } from '~/env';
import { useToast } from '~/hooks/use-toast';
import { createShortenedLink } from '~/server/actions/link-shortener';
import { checkAppRole } from '~/server/actions/role';

import { useLinkCreateDialog } from './link-create-dialog-context';

const SHORTENED_LINK_ORIGIN =
  env.NEXT_PUBLIC_SHORTENED_LINK_ORIGIN ?? 'https://intania.link';

const formSchema = z.object({
  name: z.string().max(50, {
    message: 'Name must be less than 50 characters',
  }),
  slug: z
    .string()
    .min(1, {
      message: 'Slug is required',
    })
    .max(50)
    .regex(/^[a-z0-9-]+$/i, {
      message: 'Please enter a valid slug',
    }),
  url: z.string().url({
    message: 'Please enter a valid URL',
  }),
});

const LinkCreateDialogContent: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { setOpen } = useLinkCreateDialog();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setLoading(true);

    const resCheck = await checkAppRole({ appId: 'esc', role: 'admin' });
    if (!resCheck.success) {
      setLoading(false);

      toast({
        title: 'Failed to check role',
        description: resCheck.message ?? 'Something went wrong',
        variant: 'destructive',
      });

      console.error(resCheck.errors);

      return;
    }

    const { data: isAuthorized } = resCheck;

    if (
      !isAuthorized &&
      (values.slug.includes('-esc-') ||
        values.slug.includes('-esc') ||
        values.slug.startsWith('esc'))
    ) {
      form.setError('slug', {
        type: 'manual',
        message: 'You do not have permission to have “esc” in the slug',
      });

      setLoading(false);
      return;
    }

    const resCreate = await createShortenedLink({
      name: values.name,
      slug: values.slug,
      url: values.url,
    });
    if (!resCreate.success) {
      setLoading(false);

      toast({
        title: 'Failed to create shortened link',
        description: resCreate.message ?? 'Something went wrong',
        variant: 'destructive',
      });

      console.error(resCreate.errors);

      return;
    }

    form.reset();

    setOpen(false);
    setLoading(false);

    router.refresh();
  }

  return (
    <DialogContent className="md:max-w-md">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Shorten a link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="my-website"
                      {...field}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]+/g, '-');

                        field.onChange(sanitizedValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be shortened in{' '}
                    {SHORTENED_LINK_ORIGIN.split('//')[1]}
                    /xxx
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

export default LinkCreateDialogContent;
