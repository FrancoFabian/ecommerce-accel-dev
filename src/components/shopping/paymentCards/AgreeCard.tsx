import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { CardNumber } from '../inputs/CardNumber';
import { InputDelivery } from '../inputs/InputDelivery';


export const AgreeCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCVC: "",
    cardEmail: "",
    cardName: "",
  });
  const handleInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div >
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
              Add a new payment method
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
        <div
          className="py-2"
        >
          <div className="overflow-x-hidden flex flex-col gap-4">
            {/* Aquí puedes agregar el contenido que irá dentro del contenedor */}
            <InputDelivery 
            name="emailPayment" 
            label="Correo electrónico"
            value={cardData.cardEmail}
            type="email"
            placeholder="Introduce tu correo electrónico"
            onChange={(value) => handleInputChange("cardEmail", value)}
            floatLabel={false} 
            theme="light" 
            required={false} />
            <CardNumber 
            cardNumber={cardData.cardNumber} 
            cardMonth={cardData.cardMonth} 
            cardYear={cardData.cardYear} 
            cardCVC={cardData.cardCVC} 
            onChange={handleInputChange}
            />
            <InputDelivery 
            name="titularCard" 
            label="Nombre del titular de la tarjeta"
            value={cardData.cardName}
            type="text"
            placeholder="Nombre del titular de la tarjeta"
            onChange={(value) => handleInputChange("cardName", value)}
            floatLabel={false} 
            theme="light" 
            required={false} />

          </div>
        </div>
      </section>
    </div>
  );
};


