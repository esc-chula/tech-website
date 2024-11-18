'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
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
import { cn } from '~/lib/utils';
import { updateShortenedLink } from '~/server/actions/link-shortener';
import { type ShortenedLink } from '~/types/link-shortener';

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

interface LinkEditCardProps {
  className?: string;
  shortenedLink: ShortenedLink;
}

const LinkEditCard: React.FC<LinkEditCardProps> = ({
  className,
  shortenedLink,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: shortenedLink.name,
      slug: shortenedLink.slug,
      url: shortenedLink.url,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    try {
      setLoading(true);

      const res = await updateShortenedLink({
        id: shortenedLink.id,
        name: values.name,
        slug: values.slug,
        url: values.url,
      });

      if (!res.success) {
        console.error(res.errors);
        toast({
          title: 'Failed to create shortened link',
          description: res.message,
          variant: 'destructive',
        });
        return;
      }

      if (res.data.slug !== shortenedLink.slug) {
        router.push(`/tools/link-shortener/${res.data.slug}`);
      }

      setLoading(false);
      setAlertOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to create shortened link',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className={cn('h-min', className)}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Input placeholder="my-website" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be shortened in{' '}
                    {env.NEXT_PUBLIC_SHORTENED_LINK_ORIGIN.split('//')[1]}/xxx
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
          <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button
                disabled={loading || !form.formState.isDirty}
                type="button"
                variant="primary"
              >
                Save
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={loading}
                  variant="primary"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </Card>
  );
};

export default LinkEditCard;
