'use client';
import { FormProgress } from '../forms/FormProgress';

interface FormAllShoppingcarProps {
  onBack?: () => void;
  onComplete?: () => void;
  isLoading?: boolean;
  checkoutData?: any;
  setCheckoutData?: (data: any) => void;
}

export const FormAllShoppingcar = ({
}) => {
  return (
    <div className="flex h-full flex-1 flex-col p-4 overflow-auto">
      <FormProgress/>
    </div>
  );
};
