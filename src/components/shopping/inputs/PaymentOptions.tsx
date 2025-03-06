import { MastercardIcon } from "@/icons/MastercardIcon";
import { PaypalIcon } from "@/icons/PaypalIcon";
import { VisaIcon } from "@/icons/VisaIcon";
import {FaWhatsapp} from 'react-icons/fa'
interface PaymentMethodProps {
    id: string;
    label: string;
    expires: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
    recomended?: boolean;
    onlyInfo:string
    popular?: boolean;
  }
  

export const PaymentOptions = ({id, label, expires, isSelected, onSelect, recomended, onlyInfo, popular}: PaymentMethodProps) => {
    return (
      <label
      onClick={() => onSelect(id)}
      className={`group relative tap-highlight-transparent p-2 inline-flex m-0 px-3 py-4 max-w-[100%] items-center justify-between flex-row-reverse w-full cursor-pointer rounded-lg 
        !border-[2px] ${isSelected ? (id === 'whatsapppayment4' ? 'border-[#25a760]' : 'border-primary') : 'border-gray-200'}`}
      data-selected={isSelected}
    >
        <span
          style={{
            border: 0,
            clip: "rect(0px, 0px, 0px, 0px)",
            clipPath: "inset(50%)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            width: "1px",
            whiteSpace: "nowrap",
          }}
        >
          <input
            tabIndex={-1}
            type="radio"
            value={id}
            checked={isSelected}
            readOnly
            name="payment-method"
          />
        </span>
        <span
          aria-hidden="true"
          className={`relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-[2px] box-border border-default rounded-full ${
            isSelected
              ? `${id === 'whatsapppayment4' ?"border-[#059669]":"border-primary"}`
              : "hover:bg-gray-300"
          } w-5 h-5`}
        >
          <span
            className={`z-10 opacity-0 scale-0 origin-center rounded-full ${
              isSelected
                ? "opacity-100 scale-100"
                : ""
            } w-2 h-2 ${id === 'whatsapppayment4' ?"bg-[#059669]": "bg-primary"}`}
          ></span>
        </span>
        <div className="flex flex-col rtl:mr-2 rtl:ml-[unset] ml-0">
          <span className="relative text-foreground select-none text-medium">
            <div className="flex w-full items-center gap-3">
              <div className="item-center flex rounded-small p-2">
               {id === 'visapayment1' && <VisaIcon />}
               {id === 'mastercardpayment2' && <MastercardIcon />}
               {id === 'paypalpayment3' && <PaypalIcon />}
                {id === 'whatsapppayment4' && <FaWhatsapp className="text-2xl text-[#059669]"/>}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-3">
                  <p className="text-small">{label}</p>
                  {recomended || popular ? (
                  <div
                    className={`relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap rounded-full ${
                      popular
                        ? "bg-primary/20 text-primary"
                        : "bg-success/20 text-success dark:text-success"
                    } h-6 p-0 text-tiny`}
                  >
                    <span className="flex-1 text-inherit font-normal px-2">
                      {popular ? "+Popular" : "Recomendado"}
                    </span>
                  </div>
                ) : null}

                </div>
                <p className="text-tiny text-default-400">{expires.length > 0 ? `Vencimiento el ${expires}` : onlyInfo}</p>
              </div>
            </div>
          </span>
        </div>
      </label>
    );
  };