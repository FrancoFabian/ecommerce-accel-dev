'use client';
import React,{ useState, useRef } from 'react';
import { useRippleEffect } from '@/lib/hooks/useRippleEfecct';
import { InputDelivery } from '../inputs/InputDelivery';
import { PaymentMethods } from '../paymentCards/PaymentMethods';
import { AgreeCard } from '../paymentCards/AgreeCard';
import { ShopinggCart } from '../ShopinggCart';
import { ProgressSteps } from '../progress/ProgressSteps';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BackMenuCart } from '../topMenu/backMenuCart';
import { inputGroups } from '../../../app/data/FormDataShppingcard';
import '../../styles/animationRipple.css';

type FormValueKeys =
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'address'
    | 'lugardeenvio'
    | 'city'
    | 'pais'
    | 'codigopostal'
    | 'numberPhone';

// interface InputConfig {
//     name: FormValueKeys;
//     label: string;
//     type: string;
//     placeholder: string;
//     required: boolean;
// }
export const FormProgress = () => {
    // State object to hold all input values
    const [formValues, setFormValues] = useState<Record<FormValueKeys, string>>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        lugardeenvio: '',
        city: '',
        pais: '',
        codigopostal: '',
        numberPhone: '',
    });
    const [currentStep, setCurrentStep] = useState(1);
    const containerRef = useRef(null);
    useRippleEffect('ripple-button');
    // Handler to update form values
    const handleChange = (name: FormValueKeys, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Lógica para enviar el formulario o realizar la acción final
            console.log('Pedido realizado:', formValues);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    useGSAP(() => {
        gsap.fromTo(
          containerRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 }
        );
      }, [currentStep]);
    return (
        <React.Fragment>
              <BackMenuCart onBack={handlePrevStep} currentStep={currentStep} />
      <form className="mt-8 flex flex-col gap-3">
        <h1 className="text-xl font-medium">
          {currentStep === 1 && 'Revisa tu pedido'}
          {currentStep === 2 && '¿A dónde vamos a enviar su pedido?'}
          {currentStep === 3 && '¿Cómo te gustaría pagar?'}
        </h1>
        <div className="mt-1 flex flex-col gap-6 overflow-y-auto lg:h-[42vh] 2xl:h-[50vh]  h-[47vh]">
          <div
            className="flex flex-col gap-4"
            style={{ position: 'relative', minHeight: '300px' }}
            ref={containerRef}
          >
            {currentStep === 1 && <ShopinggCart />}
            {currentStep === 2 &&
              inputGroups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className={`flex flex-wrap items-center gap-4 ${
                    group.inputs.length > 1 ? 'sm:flex-nowrap' : ''
                  }`}
                >
                  {group.inputs.map((input) => (
                    <InputDelivery
                      key={input.name}
                      name={input.name}
                      label={input.label}
                      value={formValues[input.name]}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={(val) => handleChange(input.name, val)}
                      floatLabel={false}
                      theme="light"
                      required={input.required}
                    />
                  ))}
                </div>
              ))}
            {currentStep === 3 && (
              <div className="flex flex-col gap-2">
                <div
                  className="px-2 w-full"
                  data-orientation="vertical"
                  aria-label="Select or add payment method"
                >
                  <PaymentMethods />
                  <AgreeCard />
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          className="ripple-button z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap 
          font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent 
           outline-none px-6 min-w-24 h-12 text-medium gap-3 rounded-lg w-full transition-transform-colors-opacity 
           motion-reduce:transition-none mt-1 bg-context text-white cursor-pointer"
          type="button"
          onClick={handleNextStep}
        >
          {currentStep === 1 && 'Continuar con el envío'}
          {currentStep === 2 && 'Continuar con el pago'}
          {currentStep === 3 && 'Realizar pedido'}
        </button>
      </form>
      <ProgressSteps currentStep={currentStep} />
        </React.Fragment>
    )
}
