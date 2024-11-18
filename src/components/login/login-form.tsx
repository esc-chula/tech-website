'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '~/hooks/use-toast';
import { login } from '~/server/actions/auth';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  studentId: z.string().min(10, {
    message: 'Student ID must be at least 10 characters.',
  }),
  password: z.string(),
});

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log('searchParams', searchParams);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const res = await login(values.studentId, values.password);

    if (!res.success) {
      console.error(res.errors);

      toast({
        title: 'Failed to login',
        description: res.message ?? 'Something went wrong',
        variant: 'destructive',
      });

      return;
    }

    const redirectUrl = searchParams.get('redirectUrl');

    router.push(redirectUrl ?? '/');
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input placeholder="6x3xxxxx21" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
