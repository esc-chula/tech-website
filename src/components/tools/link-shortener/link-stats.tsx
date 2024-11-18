import type { UtmGroupedData, UtmTag } from '~/types/link-shortener';

interface LinkStatsProps {
  groupBy: UtmTag[1];
  groupedData: UtmGroupedData;
}

const LinkStats: React.FC<LinkStatsProps> = ({ groupBy, groupedData }) => {
  // TODO: implement with table
  return Object.entries(groupedData).map(([primaryValue, utmData]) => (
    <div key={primaryValue} className="">
      <h5 className="font-medium">
        {groupBy.replace('utm', '')}: {primaryValue}
      </h5>
      {Object.entries(utmData).map(
        ([utmKey, values]) =>
          Object.keys(values).length > 0 && (
            <div key={utmKey} className="ml-4">
              <p className="text-sm text-neutral-600">
                {utmKey.replace('utm', '')}
              </p>
              <div className="ml-4">
                {Object.entries(values).map(([value, count]) => (
                  <div key={value} className="text-sm flex justify-between">
                    <span>{value}</span>
                    <span className="text-neutral-400">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  ));
};

export default LinkStats;
