import { type UtmTag } from '~/types/link-shortener';

export const utmTags = [
  ['utm_id', 'utmCampaignId'],
  ['utm_source', 'utmCampaignSource'],
  ['utm_medium', 'utmCampaignMedium'],
  ['utm_name', 'utmCampaignName'],
  ['utm_term', 'utmCampaignTerm'],
  ['utm_content', 'utmCampaignContent'],
] as UtmTag[];
