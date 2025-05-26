"use client";
import { InputForPassword } from "../../inputs/InputForPassword";
import { ContactStepProps } from "@/types/form.types";
import { BtnSubmit } from "../../submit/BtnSubmit";
import { SvgIconBtnGoogle } from "../../submit/SvgIconBtnGoogle";

interface InputConfig {
  id_register: string;
  nameInput: string;
  type: string;
  placeholder: string;
  isPassword?: boolean;
  value: string;
  onChange: (v: string) => void;
  enablePasswordStrength?: boolean;
  compareToPassword?: string;
  errors?: Record<string, string>;
}

export const StepContact = ({
  formik,
  contactMethod,
  setContactMethod,
  onSuccess,
}: ContactStepProps) => {
  
  const handleContinue = async () => {
    const errors = await formik.validateForm();
    if (errors.identifier) return;

    // Solo notificar al contenedor; la llamada a la API se gestiona arriba
    onSuccess();
  };

  /* ---------- 1. Config común ---------- */
  // const usernameConfig: InputConfig = {
  //   id_register: "username",
  //   nameInput: "Nombre de usuario",
  //   type: "text",
  //   placeholder: "Nombre de usuario",
  //   value: formik.values.username,
  //   onChange: (v) => formik.setFieldValue("username", v),
  //   isPassword: false,
  //   enablePasswordStrength: false,
  //   errors: formik.errors,
  // };

  /* ---------- 2. Config dinámica (email ↔ phone) ---------- */
  const identifierConfig: InputConfig = {
    id_register: "identifier",
    nameInput: contactMethod === "email" ? "E-mail" : "Celular",
    type: contactMethod === "email" ? "email" : "tel",
    placeholder:
      contactMethod === "email" ? "ejemplo@gmail.com" : "55-1234-5678",
    value: formik.values.identifier,
    onChange: (v) => formik.setFieldValue("identifier", v),
    isPassword: false,
    enablePasswordStrength: false,
    errors: formik.errors,
  };

  /* ---------- 3. Botón toggle (aparece SOLO sobre el segundo input) ---------- */
  const ToggleButton = () => (
    <div className="flex justify-end mb-2">
      <button
        type="button"
        onClick={() =>
          setContactMethod(contactMethod === "email" ? "phone" : "email")
        }
        className={`px-4 py-1 rounded-full text-sm border
          ${contactMethod === "email" ? "bg-white" : "bg-gray-800 text-white"}`}
      >
        {contactMethod === "email" ? "Usar celular" : "Usar e-mail"}
      </button>
    </div>
  );

  /* ---------- 4. Render ---------- */
  return (
    <div className="h-95 space-y-4">
      <header className="pb-13">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Crear una cuenta
        </h2>
        <h4 className="text-center text-slate-400">
          Por favor, ingrese su información de contacto
        </h4>
      </header>
      
      {/* Input 1: username */}
      {/* <div>
        <InputForPassword
          id={usernameConfig.id_register}
          nameInput={usernameConfig.nameInput}
          type={usernameConfig.type}
          placeholder={usernameConfig.placeholder}
          value={usernameConfig.value}
          onChange={(v) => {
            usernameConfig.onChange(v);
            formik.setFieldTouched(usernameConfig.id_register, true);
          }}
          isPassword={usernameConfig.isPassword}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}
      </div> */}

      {/* Botón toggle + Input 2: identifier */}
      <ToggleButton />
      <div>
        <InputForPassword
          id={identifierConfig.id_register}
          nameInput={identifierConfig.nameInput}
          type={identifierConfig.type}
          placeholder={identifierConfig.placeholder}
          value={identifierConfig.value}
          onChange={(v) => {
            identifierConfig.onChange(v);
            formik.setFieldTouched(identifierConfig.id_register, true);
          }}
          isPassword={identifierConfig.isPassword}
        />
        {formik.touched.identifier && formik.errors.identifier && (
          <p className="text-red-500 text-sm">{formik.errors.identifier}</p>
        )}
      </div>
      
      <div className="space-y-4 pt-4">
        <BtnSubmit
          name="Continuar"
          type="button"
          onClicked={handleContinue}
          className="relative w-full z-0 inline-flex items-center justify-center box-border appearance-none select-none 
                  whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
                  focus-visible:z-10 focus-visible:outline-2 px-4 min-w-20 h-10 py-6 
                  text-md gap-2 rounded-md transition-all transform bg-gray-800 shadow-md text-white hover:opacity-90 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={!formik.values.identifier || !!formik.errors.identifier || formik.isSubmitting}
        />
        
        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-300"></div>
          <div className="relative bg-white px-4 text-sm text-gray-500">
            o continúa con
          </div>
        </div>
        
        <BtnSubmit
          name="Iniciar con Google"
          type="button"
          onClicked={async () => {
            // Asumimos que existe una función signInWithGoogle
            // await signInWithGoogle();
           // onSuccess({ skip: true });
          }}
          className="relative w-full z-0 inline-flex items-center justify-center box-border appearance-none select-none 
                  whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none 
                  focus-visible:z-10 focus-visible:outline-2 px-4 min-w-20 h-10 py-6 
                  text-md gap-2 rounded-md transition-all transform bg-gray-100 shadow-md text-black hover:opacity-90 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          icon={<SvgIconBtnGoogle className="text-2xl" />}
          disabled={false}
        />
      </div>
    </div>
  );
};
