"use client";

import { InputForPassword } from "../../inputs/InputForPassword";
import { PasswordStepProps } from "@/types/form.types";
import { Fragment } from "react";

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

export const StepPassword = ({ formik }: PasswordStepProps) => {
  const InputsObject: InputConfig[] = [
    {
    id_register: "username",
    nameInput: "Nombre de usuario",
    type: "text",
    placeholder: "Nombre de usuario",
    value: formik.values.username,
    onChange: (v) => formik.setFieldValue("username", v),
    isPassword: false,
    enablePasswordStrength: false,
    errors: formik.errors,
  },
    {
      id_register: "password",
      nameInput: "Contraseña",
      type: "password",
      placeholder: "Contraseña",
      value: formik.values.password,
      onChange: (v: string) => formik.setFieldValue("password", v),
      enablePasswordStrength: true,
      compareToPassword: "Contraseña",
      isPassword: true,
      errors: formik.errors,
    },
    {
      id_register: "confirmPassword",
      nameInput: "Confirmar contraseña",
      type: "password",
      placeholder: "Confirmar contraseña",
      value: formik.values.confirmPassword,
      onChange: (v: string) => formik.setFieldValue("confirmPassword", v),
      enablePasswordStrength: false,
      compareToPassword: formik.values.password,
      isPassword: true,
      errors: formik.errors,
    },
  ];
  return (
    <div className="h-95 space-y-4">
      <header className="pb-13">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Crea una contraseña segura
        </h2>
        <h4 className="text-center text-slate-400">
          La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
        </h4>
      </header>
      {InputsObject.map(
        ({
          id_register,
          nameInput,
          type,
          placeholder,
          value,
          onChange,
          enablePasswordStrength,
          compareToPassword,
          isPassword,
          errors,
        }) => (
          <Fragment key={id_register}>
            <InputForPassword
              id={id_register}
              nameInput={nameInput}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              enablePasswordStrength={enablePasswordStrength}
              compareToPassword={compareToPassword}
              isPassword={isPassword}
            />
            {errors && errors[id_register] && (
              <p className="text-red-500 text-sm">{errors[id_register]}</p>
            )}
          </Fragment>
        )
      )}
    </div>
  );
};
