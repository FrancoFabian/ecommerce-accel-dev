'use client';
import { CardIcon } from '@/icons/CardIcon';
interface CardNumberProps {
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cardCVC: string;
  onChange: (field: string, value: string) => void;
}


export const CardNumber = ({ cardNumber, cardMonth, cardYear, cardCVC, onChange }: CardNumberProps) => {

  const handleInputChange = (field: string, value: string) => {
    // Validación específica según el campo
    if (field === "cardNumber" && /^[0-9]{0,19}$/.test(value)) {
      onChange(field, value); // Máximo 19 dígitos
    } else if (field === "cardMonth" && /^[0-9]{0,2}$/.test(value)) {
      onChange(field, value); // Máximo 2 dígitos (mes)
    } else if (field === "cardYear" && /^[0-9]{0,2}$/.test(value)) {
      onChange(field, value); // Máximo 2 dígitos (año)
    } else if (field === "cardCVC" && /^[0-9]{0,3}$/.test(value)) {
      onChange(field, value); // Máximo 3 dígitos (CVC)
    }
  };
  return (
    <div
      className="group flex flex-col w-full group relative justify-end"
      data-slot="base"
      data-filled="true"
      data-filled-within="true"
      data-has-elements="true"
      data-has-label="true"
    >
      <div data-slot="main-wrapper" className="h-full flex flex-col">
        <div
          data-slot="input-wrapper"
          className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 border-[2px] border-gray-300
          h-10 min-h-10 rounded-xl  !duration-150 motion-reduce:transition-none"
          style={{ cursor: 'text' }}
        >
          <label
            data-slot="label"
            className="absolute pointer-events-none subpixel-antialiased block 
             text-black will-change-auto !duration-200 !ease-out 
             motion-reduce:transition-none
               pb-0 z-20 top-[-25px] text-sm left-[-1px]
               pe-2 max-w-full text-ellipsis overflow-hidden"
            htmlFor="card-number"
          >
            Número de tarjeta
          </label>
          <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
            <span>
              <CardIcon className='text-gray-400' />
            </span>
            <input
              className="w-full font-normal bg-transparent !outline-none
               placeholder:text-slate-500 focus-visible:outline-none 
               ps-1.5 pe-1.5 no-spinner
               file:cursor-pointer file:bg-transparent file:border-0 
               autofill:bg-transparent bg-clip-text text-sm"
              aria-label="Card number"
              autoComplete="cc-number"
              placeholder="555 5555 5555"
              value={cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              type="text"
              name="cardNumber"

            />
            <div className="flex max-w-[140px] items-center">
              <input
                className="w-11 rounded-sm 
                bg-transparent text-small outline-none 
                placeholder:text-default-400 no-spinner"
                autoComplete="cc-exp-month"
                placeholder="mm"
                type="text"
                value={cardMonth}
                onChange={(e) => handleInputChange("cardMonth", e.target.value)}
                name="cardmonth"
              />
              <span className="mx-1 text-gray-300">/</span>
              <input
                className="w-11 rounded-sm bg-transparent text-small 
                outline-none placeholder:text-default-400 no-spinner"
                autoComplete="cc-exp-year"
                placeholder="yy"
                type="text"
                value={cardYear}
                onChange={(e) => handleInputChange("cardYear", e.target.value)}
                name="cardYear"
                
              />
              <span className="mx-1 text-gray-300">/</span>
              <input
                className="w-11 rounded-sm bg-transparent 
                text-small outline-none placeholder:text-default-400"
                placeholder="cvc"
                autoComplete='cc-csc'
                type="text"
                value={cardCVC}
                onChange={(e) => handleInputChange("cardCVC", e.target.value)}
                name="cardCVC"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


