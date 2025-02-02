'use client';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  loggerLink,
  unstable_httpBatchStreamLink as unstableHttpBatchStreamLink,
} from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { useMemo } from 'react';
import { default as SuperJSON } from 'superjson';

import { type AppRouter } from '~/server/api/root';

import { createQueryClient } from './query-client';

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = (): QueryClient => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

interface TRPCReactProviderProps {
  children: React.ReactNode;
}

export const TRPCReactProvider: React.FC<TRPCReactProviderProps> = (props: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();

  const trpcClient = useMemo(() => {
    return api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstableHttpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
};

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
