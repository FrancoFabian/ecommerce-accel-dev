"use client";

import { CodeVerification } from "../CodeVerification";

export const StepVerification = (
    {
        formik,
        contactMethod,
        destination,
        goNext,          // función que adelanta al siguiente paso
      }: {
        formik: any;
        contactMethod: "email" | "phone";
        destination: string;      // email o teléfono al que se envió el código
        goNext: () => void;
      }
) => {
      /**
   * Se ejecuta cuando el usuario introduce el código completo.
   * 1. Lo guardamos en Formik.
   * 2. Disparamos la validación.
   * 3. Si no hay errores → avanzamos.
   */
  const handleSubmitCode = async (code: string) => {
    await formik.setFieldValue("verificationCode", code);

    const errors = await formik.validateForm();
    if (!errors.verificationCode) {
      goNext();
    }
  };


  return (
    <div className="space-y-4">
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
      // clases opcionales
      containerClassName="w-full bg-white"
      />
    </div>
  )
}
