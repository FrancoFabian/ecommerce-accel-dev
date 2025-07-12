"use client";

import { useState } from "react";
import { useFormik} from "formik";
import { StepIndicator } from "../RegisterAtoms/StepIndicator";
// Steps

import { stepSchemas } from "@/validations/registrationSchemas";
import { FormValues } from "@/types/form.types";
import { useRegistrationHandlers } from "@/hooks/useRegistrationHandlers";
import { useRegistrationSteps } from "@/hooks/useRegistrationSteps";
import { showError } from "@/utils/notifications";



// type StepState = {
//   contactMethod: "email" | "phone";
//   setContactMethod: React.Dispatch<React.SetStateAction<"email" | "phone">>;
//   date: Date | undefined;
//   setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
//   goNext: (code: string) => void;
// };


export const RegistrationForm = () => {
   /* ---------- estado local ---------- */
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [date, setDate] = useState<Date>();
 

  
  // ----- 2. Formik -----
 const formik = useFormik<FormValues>({
    initialValues: {
      contactMethod: "email",
      identifier: "",
      username: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      secondLastName: "",
      alternativeContact: "",
      birthDate: undefined,
      street: "",
      colony: "",
      municipality: "",
      state: "",
      zipCode: "",
      country: "",
      newsletter: false,
      termsAccepted: false,
    },
     validate: (values) => {
      // 1) extrae sólo las keys de este paso
      const currentStepTyped = handlers.currentStep as keyof typeof stepSchemas;
      const stepSchema = stepSchemas[currentStepTyped];
      // Si el schema es ZodEffects (por ejemplo, por .refine()), extrae el objeto interno
      const objectSchema = "innerType" in stepSchema ? stepSchema.innerType() : stepSchema;
     
      const keys = Object.keys(objectSchema.shape) as (keyof FormValues)[];
      const subset = keys.reduce((o, k) => { 
        o[k] = values[k]; 
        return o; 
      }, {} as Record<keyof FormValues, string | boolean | Date | undefined>);

      // 2) haz safeParse
      const result = stepSchemas[currentStepTyped].safeParse(subset);
      if (result.success) return {};

      // 3) flatten los errores en { campo: mensaje }
      const fieldErrors = result.error.flatten().fieldErrors;
      return Object.fromEntries(
        Object.entries(fieldErrors)
          .filter(([, msgs]) => msgs && msgs.length > 0)
          .map(([k, msgs]) => [k, msgs![0]])
      );
    },
      onSubmit: async () => {
      try {
        switch (handlers.currentStep) {
          case 3: await handlers.handlePasswordSubmit();       break;
          case 4: await handlers.handleProfileSubmit();        break;
          case 5: await handlers.handleAddressSubmit();        break;
          case 6: await handlers.handleCompleteRegistration(); return;
          default: handlers.setCurrentStep(s => s + 1);
        }
      } catch (e) {
        showError("Algo salió mal"+" "+e);
      }
    },
  });

  const handlers = useRegistrationHandlers(formik, contactMethod);
  const steps    = useRegistrationSteps({ formik, contactMethod, setContactMethod, date, setDate, handlers });

  const Active = steps[handlers.currentStep - 1];
  const StepComponent = Active.Component as React.ComponentType<typeof Active.props>;


 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
    <div className="w-full flex flex-wrap max-w-4xl bg-white rounded-lg shadow-lg">
      <StepIndicator currentStep={handlers.currentStep} steps={steps} />

      <form onSubmit={formik.handleSubmit} className="w-2/3 px-12 pt-10">
        {/* ─── el paso activo ─── */}
        <StepComponent {...Active.props} />

        {/* Botones */}
        <div className="mt-10 flex justify-between">
          {handlers.currentStep > 1 && (
            <button type="button" onClick={() => handlers.setCurrentStep(s => s - 1)}>
              Anterior
            </button>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {handlers.currentStep === 6 ? "Completar" : "Siguiente"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}
