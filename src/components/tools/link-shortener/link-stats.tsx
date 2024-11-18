import type { UtmGroupResult, UtmTag } from '~/types/link-shortener';

interface LinkStatsProps {
  groupBy: UtmTag[1];
  groupedData: UtmGroupResult;
}

const LinkStats: React.FC<LinkStatsProps> = ({ groupBy, groupedData }) => {
  const entries = Object.entries(groupedData.groups);

  if (entries.length === 0) {
    return (
      <div className="py-2 flex flex-col">
        <hr className="border-neutral-700" />
        <p className="text-sm text-neutral-600 text-center pt-12 pb-8">
          {`There's no data for ${groupBy} tag.`}
        </p>
      </div>
    );
  }

  return entries.map(([primaryValue, utmData]) => (
    <div key={primaryValue} className="py-2 flex flex-col">
      <hr className="border-neutral-700" />
      <div className="flex flex-col gap-2 pt-6 pb-4">
        <div className="flex justify-between items-center">
          <h5 className="font-semibold text-lg">{primaryValue}</h5>
          <span className="text-sm text-neutral-400">
            Total: {groupedData.selectedTagCount[primaryValue]}
          </span>
        </div>

        {Object.entries(utmData)
          .filter(([, values]) => Object.keys(values).length > 0)
          .map(([utmKey, values]) => (
            <div key={utmKey}>
              <div className="flex justify-between items-center py-1.5">
                <p className="text-sm text-neutral-500">
                  {utmKey.replace('utmCampaign', '')}
                </p>
                <p className="text-neutral-600 text-sm font-medium">Count</p>
              </div>
              <div className="flex flex-col">
                {Object.entries(values)
                  .sort(([, a], [, b]) => b - a)
                  .map(([value, count]) => (
                    <div
                      key={value}
                      className="hover:bg-neutral-900 rounded-lg py-2 px-3 text-sm flex items-center justify-between"
                    >
                      <span className="font-medium">{value}</span>
                      <span className="text-neutral-400">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  ));
};

export default LinkStats;
