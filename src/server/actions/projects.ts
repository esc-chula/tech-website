'use server'

import { readItems } from '@directus/sdk'

import directus from '~/lib/directus'
import { type Project } from '~/types/about'
import { type Response } from '~/types/server'

export async function getProjects(): Promise<Response<Project[]>> {
  try {
    const projects = await directus.request(
      readItems('Tech_web_about' as never)
    )

    return {
      success: true,
      message: 'Successfully fetched projects',
      data: projects as never as Project[],
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch projects',
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    }
  }
}
