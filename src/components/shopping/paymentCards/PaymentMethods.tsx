import { useState } from "react";
// Asegúrate de importar el componente correctamente
import { PaymentOptions } from "../inputs/PaymentOptions";

import { FiChevronLeft } from "react-icons/fi";

interface PaymentMethodData {
  id: string;
  label: string;
  expires: string;
  recomended?: boolean;
  onlyInfo: string
  popular?: boolean;
}

export const PaymentMethods: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null); // Estado para manejar la selección
  const [isOpen, setIsOpen] = useState(true);

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  const paymentMethods: PaymentMethodData[] = [
    {id: 'whatsapppayment4', label: "Whatsapp", expires: "", recomended: false, onlyInfo: "Seleccione este método para ordenar por WhatsApp",popular:true },
    { id: 'visapayment1', label: "****4229", expires: "12/2024", recomended: true, onlyInfo: "",popular:false },
    { id: 'mastercardpayment2', label: "****5678", expires: "01/2025", recomended: false, onlyInfo: "",popular:false },
    { id: 'paypalpayment3', label: "PayPal", expires: "", recomended: false, onlyInfo: "Seleccione este método para pagar con PayPal",popular:false },
    
  ];

  const handleSelect = (id: string) => {
    setSelected(id); // Actualizar la selección
  };

  return (
    <div>
    <h2>
      <button
        className="flex py-4 w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-opacity"
        type="button"
        id=":r2q:"
        aria-expanded={isOpen}
        onClick={toggleContainer}
      >
        <div className="flex-1 flex flex-col text-start">
          <span className="text-medium text-foreground-500">
            Seleccione un metodo de pago existente
          </span>
        </div>
        <span
          aria-hidden="true"
          className={`transition-transform ${
            isOpen ? '-rotate-90' : 'rotate-0'
          } rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 text-foreground`}
        >
          <FiChevronLeft size="1em" />
        </span>
      </button>
    </h2>
    <section
      style={{
        willChange: 'auto',
        opacity: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : '0px',
        overflowY: 'hidden',
        transition: 'opacity 0.3s ease, height 0.3s ease',
      }}
    >
      <div data-open="true" className="py-2" id=":r2d:" role="region" aria-labelledby=":r2c:">
        <div
          className="relative flex flex-col gap-2"
          aria-label="Select existing payment method"
          role="radiogroup"
          aria-orientation="vertical"
          id="react-aria7134611675-:r2e:"
        >
          <div
            className="flex flex-col flex-wrap data-[orientation=horizontal]:flex-row gap-3"
            role="presentation"
            data-orientation="vertical"
          >
            {paymentMethods.map((method) => (
              <PaymentOptions
                key={method.id}
                id={method.id}
                label={method.label}
                expires={method.expires}
                isSelected={selected === method.id}
                onSelect={handleSelect}
                recomended={method.recomended}
                onlyInfo={method.onlyInfo}
                popular={method.popular}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
