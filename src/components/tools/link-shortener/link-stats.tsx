import type { UtmGroupedData, UtmTag } from '~/types/link-shortener';

interface LinkStatsProps {
  groupBy: UtmTag[1];
  groupedData: UtmGroupedData;
}

const LinkStats: React.FC<LinkStatsProps> = ({ groupBy, groupedData }) => {
  const entries = Object.entries(groupedData);

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
        <h5 className="font-semibold text-lg">{primaryValue}</h5>
        {Object.entries(utmData).map(
          ([utmKey, values]) =>
            Object.keys(values).length > 0 && (
              <div key={utmKey} className="">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-neutral-500">{utmKey}</p>
                  <p className="text-neutral-600 text-sm font-medium">Count</p>
                </div>
                <div className="flex flex-col gap-1">
                  {Object.entries(values).map(([value, count]) => (
                    <div
                      key={value}
                      className="hover:bg-neutral-900 py-2 px-3 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span className="font-semibold">{value}</span>
                      <span className="">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  ));
};

export default LinkStats;
