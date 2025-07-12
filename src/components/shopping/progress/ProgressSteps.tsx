interface ProgressStepsProps {
    currentStep: number;
}
export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="mt-auto 2xl:mt-2 flex w-full justify-between gap-8 pb-12 pt-4">
      {/* Paso 1 */}
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-small font-medium">Review</p>
        <div
          className="flex flex-col gap-2 w-full"
          aria-valuenow={currentStep >= 1 ? 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        >
          <div className="z-0 relative bg-gray-900 overflow-hidden h-3 rounded-full">
            <div
              className="h-full bg-gray-200 rounded-full transition-transform !duration-500 !bg-context"
              style={{ transform: `translateX(${currentStep >= 1 ? '0%' : '-100%'})` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Paso 2 */}
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-small font-semibold">Delivery</p>
        <div
          className="flex flex-col gap-2 w-full"
          aria-valuenow={currentStep >= 2 ? 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        >
          <div className="z-0 relative bg-gray-200 overflow-hidden h-3 rounded-full">
            <div
              className="h-full bg-gray-200 rounded-full transition-transform !duration-500 !bg-context"
              style={{ transform: `translateX(${currentStep >= 2 ? '0%' : '-100%'})` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Paso 3 */}
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-small font-medium">Payment</p>
        <div
          className="flex flex-col gap-2 w-full"
          aria-valuenow={currentStep >= 3 ? 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        >
          <div className="z-0 relative bg-gray-200 overflow-hidden h-3 rounded-full">
            <div
              className="h-full bg-gray-200 rounded-full transition-transform !duration-500 !bg-context"
              style={{ transform: `translateX(${currentStep >= 3 ? '0%' : '-100%'})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};