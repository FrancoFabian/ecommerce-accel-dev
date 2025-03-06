

interface PriceRangeBarsProps {
  barHeights: number[];
  values: [number, number];
  getBarIndex: (value: number) => number;
}

export const PriceRangeHistogram = ({ barHeights, values, getBarIndex }: PriceRangeBarsProps) => {
  return (
    <div className="flex h-12 w-full items-end justify-between px-2">
      {barHeights.map((height, index) => {
        const inRange = index >= getBarIndex(values[0]) && index <= getBarIndex(values[1]);
        return (
          <span
            key={index}
            className={`relative h-12 w-1 rounded-full bg-gray-400/50 after:absolute after:bottom-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:duration-500 after:content-[''] ${
              inRange ? 'after:h-full' : 'after:h-0'
            }`}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
};


