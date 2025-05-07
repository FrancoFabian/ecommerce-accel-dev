"use client";

import { InputForPassword } from "../../inputs/InputForPassword";

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
  

export const StepPassword = ({ formik }: { formik: any }) => {
    const InputsObject: InputConfig[] = [
        {
          id_register: "password_register",
          nameInput: "Contraseña", 
          type: "password",
          placeholder: "Contraseña" ,
          value: formik.values.password_register,
          onChange: (v: string) => formik.setFieldValue("password_register", v),
          enablePasswordStrength: true,
          compareToPassword: "Contraseña",
          isPassword: true,
          errors: formik.errors.password_register,
          },
        {
          id_register: "confirmPassword_register",
          nameInput: "Confirmar contrseña", 
          type: "password", 
          placeholder: "Confirmar contraseña",
          value: formik.values.confirmPassword_register,
          onChange: (v: string) => formik.setFieldValue("confirmPassword_register", v),
          enablePasswordStrength: false,
          compareToPassword: "Confirmar contraseña",
          isPassword: true,
          errors: formik.errors.identifier,
          },
    ];
    return (
      <div className="space-y-4">
        {InputsObject.map(({id_register,nameInput, type,placeholder,value,onChange,enablePasswordStrength,compareToPassword,isPassword,errors}) => (
                    <>
                    <InputForPassword
                      key={id_register}
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
                    {errors && (
                      <p className="text-red-500 text-sm">{errors[id_register]}</p>
                    )}
                    </>
                  ))}
      </div>
    )
}