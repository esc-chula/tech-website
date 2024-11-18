import { utmTags } from '~/constants/link-shortener';
import {
  type ShortenedLinkWithVisitedRecords,
  type UtmGroupedData,
  type UtmTag,
} from '~/types/link-shortener';

export function groupUtmData(
  data: ShortenedLinkWithVisitedRecords['userShortenedLinkVisitedRecords'],
  primaryKey: UtmTag[1],
): UtmGroupedData {
  const utmKeys = utmTags
    .map(([, value]) => value)
    .filter((key) => key !== primaryKey);

  return data.reduce<UtmGroupedData>((result, item) => {
    const primaryValue = item[primaryKey];

    if (primaryValue === null) return result;

    if (!result[primaryValue]) {
      result[primaryValue] = {};
      const existingPrimaryValues = result[primaryValue];
      utmKeys.forEach((utmKey) => {
        existingPrimaryValues[utmKey] = {};
      });
    }

    utmKeys.forEach((utmKey) => {
      const value = item[utmKey];
      if (value !== null) {
        const resultValue = result[primaryValue]
          ? result[primaryValue]
          : ({} as Record<string, Record<string, number>>);
        const existingValues = resultValue[utmKey] ? resultValue[utmKey] : {};

        if (!existingValues[value]) {
          existingValues[value] = 1;
        } else {
          existingValues[value]++;
        }
      }
    });

    return result;
  }, {});
}
