'use server';

import type { OAuth2Client } from '@ory/hydra-client';

import { hydra } from '~/lib/hydra';
import { type Response } from '~/types/server';

import { me } from './auth';

export async function listOAuth2Clients(): Promise<Response<OAuth2Client[]>> {
  try {
    const res = await me();

    if (!res.success) {
      return {
        success: false,
        message: 'Failed to fetch OAuth 2.0 clients',
        errors: ['Failed to fetch user information'],
      };
    }

    const { studentId } = res.data;

    const clients = await hydra.listOAuth2Clients({
      owner: studentId,
    });

    if (clients.status !== 200) {
      return {
        success: false,
        message: 'Failed to list OAuth 2.0 clients',
        errors: [clients.statusText],
      };
    }

    return {
      success: true,
      message: 'Successfully fetched OAuth 2.0 clients',
      data: clients.data.sort((a, b) => {
        if (!a.created_at || !b.created_at) {
          return 0;
        }

        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch OAuth 2.0 clients',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

export async function getOAuth2Client(
  id: string,
): Promise<Response<OAuth2Client>> {
  try {
    const client = await hydra.getOAuth2Client({ id });

    if (client.status !== 200) {
      return {
        success: false,
        message: 'Failed to fetch OAuth 2.0 client',
        errors: [client.statusText],
      };
    }

    return {
      success: true,
      message: 'Successfully fetched OAuth 2.0 client',
      data: client.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch OAuth 2.0 client',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

export async function createOAuth2Client(
  body: OAuth2Client,
): Promise<Response<OAuth2Client>> {
  try {
    const client = await hydra.createOAuth2Client({ oAuth2Client: body });

    if (client.status !== 201) {
      return {
        success: false,
        message: 'Failed to create OAuth 2.0 client',
        errors: [client.statusText],
      };
    }

    return {
      success: true,
      message: 'Successfully created OAuth 2.0 client',
      data: client.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create OAuth 2.0 client',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

export async function updateOAuth2Client(
  id: string,
  body: OAuth2Client,
): Promise<Response<OAuth2Client>> {
  try {
    const patchBody = Object.entries(body).map(
      ([key, value]:
        | [key: string, value: unknown]
        | [key: string, value: unknown[]]) => ({
        op: 'replace',
        path: `/${key}`,
        value,
      }),
    );

    const client = await hydra.patchOAuth2Client({ id, jsonPatch: patchBody });

    if (client.status !== 200) {
      return {
        success: false,
        message: 'Failed to update OAuth 2.0 client',
        errors: [client.statusText],
      };
    }

    return {
      success: true,
      message: 'Successfully updated OAuth 2.0 client',
      data: client.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update OAuth 2.0 client',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

export async function deleteOAuth2Client(id: string): Promise<Response<null>> {
  try {
    const client = await hydra.deleteOAuth2Client({ id });

    if (client.status !== 204) {
      return {
        success: false,
        message: 'Failed to delete OAuth 2.0 client',
        errors: [client.statusText],
      };
    }

    return {
      success: true,
      message: 'Successfully deleted OAuth 2.0 client',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete OAuth 2.0 client',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}
