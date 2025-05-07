"use client"
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

export const StepContact = ({formik}: {formik: any;}) => {
  
    const InputsObject: InputConfig[] = [
      {
        id_register: "username_register",
        nameInput: "Nombre de usuario", 
        type: "text",
        placeholder: "Nombre de usuario" ,
        value: formik.values.username,
        onChange: (v: string) => formik.setFieldValue("username_register", v),
        enablePasswordStrength: false,
        compareToPassword: undefined,
        isPassword: false,
        },
      {
        id_register: "identifier_register",
        nameInput: "E-mail o celular", 
        type: "email", 
        placeholder: "ejmpl@gmail.com or 1234567890",
        value: formik.values.identifier,
        onChange: (v: string) => formik.setFieldValue("identifier_register", v),
        enablePasswordStrength: false,
        compareToPassword: undefined,
        isPassword: false,
        errors: formik.errors.identifier,
        },
    ];
    return (
      <div className="space-y-4">
        {/* Email or Phone */}
        <div className="space-y-2">
          {InputsObject.map(({id_register,nameInput, type,placeholder,value,onChange,enablePasswordStrength,compareToPassword,isPassword,errors}) => (
            <>
            <InputForPassword
              key={id_register}
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
      </div>
    );
  }