export interface ShortenedLink {
  id: number
  name: string
  url: string
  slug: string
  count: number
  userId: number
  editedAt: Date
}

export interface ShortenedLinkVisitedRecords {
  id: number
  utmCampaignId: string | null
  utmCampaignSource: string | null
  utmCampaignMedium: string | null
  utmCampaignName: string | null
  utmCampaignTerm: string | null
  utmCampaignContent: string | null
  userShortenedLinkId: number | null
  editedAt: Date
}

export interface ShortenedLinkWithVisitedRecords extends ShortenedLink {
  userShortenedLinkVisitedRecords: ShortenedLinkVisitedRecords[]
}

export type UtmTag = [
  (
    | 'utm_id'
    | 'utm_source'
    | 'utm_medium'
    | 'utm_name'
    | 'utm_term'
    | 'utm_content'
  ),
  (
    | 'utmCampaignId'
    | 'utmCampaignSource'
    | 'utmCampaignMedium'
    | 'utmCampaignName'
    | 'utmCampaignTerm'
    | 'utmCampaignContent'
  ),
]

export type UtmGroupedData = Record<
  string,
  Record<string, Record<string, number>>
>

export interface UtmGroupResult {
  groups: UtmGroupedData
  selectedTagCount: Record<string, number>
}
