import type { UtmGroupResult, UtmTag } from '~/types/link-shortener'

interface LinkStatsProps {
  groupBy: UtmTag[1]
  groupedData: UtmGroupResult
}

const LinkStats: React.FC<LinkStatsProps> = ({ groupBy, groupedData }) => {
  const entries = Object.entries(groupedData.groups)

  if (entries.length === 0) {
    return (
      <div className='flex flex-col py-2'>
        <hr className='border-neutral-700' />
        <p className='pb-8 pt-12 text-center text-sm text-neutral-600'>
          {`There's no data for ${groupBy} tag.`}
        </p>
      </div>
    )
  }

  return entries.map(([primaryValue, utmData]) => (
    <div key={primaryValue} className='flex flex-col py-2'>
      <hr className='border-neutral-700' />
      <div className='flex flex-col gap-2 pb-4 pt-6'>
        <div className='flex items-center justify-between'>
          <h5 className='text-lg font-semibold'>{primaryValue}</h5>
          <span className='text-sm text-neutral-400'>
            Total: {groupedData.selectedTagCount[primaryValue]}
          </span>
        </div>

        {Object.entries(utmData)
          .filter(([, values]) => Object.keys(values).length > 0)
          .map(([utmKey, values]) => (
            <div key={utmKey}>
              <div className='flex items-center justify-between py-1.5'>
                <p className='text-sm text-neutral-500'>
                  {utmKey.replace('utmCampaign', '')}
                </p>
                <p className='text-sm font-medium text-neutral-600'>Count</p>
              </div>
              <div className='flex flex-col'>
                {Object.entries(values)
                  .sort(([, a], [, b]) => b - a)
                  .map(([value, count]) => (
                    <div
                      key={value}
                      className='flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-900'
                    >
                      <span className='font-medium'>{value}</span>
                      <span className='text-neutral-400'>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  ))
}

export default LinkStats
