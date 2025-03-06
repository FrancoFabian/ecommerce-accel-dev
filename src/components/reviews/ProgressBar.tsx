export interface Rating {
    stars: number;
    percentage: number;
  }
  
  export const ProgressBar = ({ stars, percentage }: Rating) => {
    return (
      <div className="flex items-center gap-1">
        <div
          className="flex flex-col gap-2 w-full"
          aria-label={`${stars} estrella${stars !== 1 ? 's' : ''}`}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${percentage}%`}
          role="progressbar"
        >
          <div className="flex justify-between">
            <span className="text-medium">
              <span className="text-small">{`${stars} estrella${stars !== 1 ? 's' : ''}`}</span>
            </span>
            <span className="text-medium">{`${percentage}%`}</span>
          </div>
          <div className="relative bg-gray-200 overflow-hidden h-3 rounded-full">
            <div
              className="h-full bg-warning rounded-full transition-transform duration-500"
              style={{ transform: `translateX(-${100 - percentage}%)` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  