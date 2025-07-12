"use client";

import { CodeVerification } from "../CodeVerification";
import { VerificationStepProps } from "@/types/form.types";

export const StepVerification = ({
  formik,
  contactMethod,
  destination,
  goNext,
}: VerificationStepProps) => {
  /**
   * Se ejecuta cuando el usuario introduce el código completo.
   * 1. Lo guardamos en Formik.
   * 2. Disparamos la validación.
   * 3. Si no hay errores → avanzamos.
   */
  const handleSubmitCode = async (code: string) => {
    // Evitar llamadas duplicadas si el usuario dispara el evento dos veces
    if (formik.values.verificationCode && formik.values.verificationCode.length === 6) {
      return; // Ya se envió
    }

    await formik.setFieldValue("verificationCode", code);

    const errors = await formik.validateForm();
    if (!errors.verificationCode && goNext) {
      goNext(code);
    }
  };

  return (
    <div className="h-95 space-y-4">
      <div className="pt-13">
        <CodeVerification
          length={6}
          title={
            contactMethod === "email"
              ? "Revisa tu correo electrónico"
              : "Revisa tu teléfono"
          }
          message="Ingresa el código que te enviamos"
          destination={destination}
          onSubmit={handleSubmitCode}
          containerClassName="w-full bg-white"
        />
      </div>
    </div>
  );
};
