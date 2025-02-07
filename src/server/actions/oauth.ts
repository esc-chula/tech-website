'use server';

import type { JsonPatch, OAuth2Client } from '@ory/hydra-client';

import { hydra } from '~/lib/hydra';
import { type Response } from '~/types/server';

export async function listOAuth2Clients(): Promise<Response<OAuth2Client[]>> {
  try {
    const clients = await hydra.listOAuth2Clients();

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
      data: clients.data,
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
  body: JsonPatch[],
): Promise<Response<OAuth2Client>> {
  try {
    const client = await hydra.patchOAuth2Client({ id, jsonPatch: body });

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
