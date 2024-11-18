import { utmTags } from '~/constants/link-shortener';
import {
  type ShortenedLinkWithVisitedRecords,
  type UtmGroupResult,
  type UtmGroupedData,
  type UtmTag,
} from '~/types/link-shortener';

export function groupUtmData(
  data: ShortenedLinkWithVisitedRecords['userShortenedLinkVisitedRecords'],
  primaryKey: UtmTag[1],
): UtmGroupResult {
  const utmKeys = utmTags
    .map(([, value]) => value)
    .filter((key) => key !== primaryKey);

  const selectedTagCount: Record<string, number> = {};

  const groups = data.reduce<UtmGroupedData>((result, item) => {
    const primaryValue = item[primaryKey];

    if (primaryValue === null) return result;

    // Count occurrences of the selected UTM tag
    selectedTagCount[primaryValue] = (selectedTagCount[primaryValue] ?? 0) + 1;

    if (!result[primaryValue]) {
      result[primaryValue] = {};
      utmKeys.forEach((utmKey) => {
        const resultValue = result[primaryValue] ?? {};
        resultValue[utmKey] = {};
      });
    }

    utmKeys.forEach((utmKey) => {
      const value = item[utmKey];
      if (value !== null) {
        const resultValue = result[primaryValue] ?? {};
        const existingValues = resultValue[utmKey] ?? {};
        existingValues[value] = (existingValues[value] ?? 0) + 1;
      }
    });

    return result;
  }, {});

  return {
    groups,
    selectedTagCount,
  };
}
