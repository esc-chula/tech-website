"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createShortenedLink } from "@/server/actions/link-shortener";
import { Plus } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().max(50, {
    message: "Name must be less than 50 characters",
  }),
  slug: z
    .string()
    .min(1, {
      message: "Slug is required",
    })
    .max(50)
    .regex(/^[a-z0-9-]+$/i, {
      message: "Please enter a valid slug",
    }),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
});

export default function CreateLinkDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const res = await createShortenedLink({
        name: values.name,
        slug: values.slug,
        url: values.url,
      });

      if (!res.success) {
        console.error(res.errors);
        toast({
          title: "Failed to create shortened link",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Shortened link created",
        description: res.message,
      });

      form.reset();
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to create shortened link",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus size={16} />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input placeholder="my-website" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be shortened in intania.link/xxx
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
              <Button variant="primary" type="submit" disabled={loading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
