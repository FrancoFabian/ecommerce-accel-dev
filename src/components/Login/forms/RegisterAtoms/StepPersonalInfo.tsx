// Paso 4: Datos personales

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
  

export const StepPersonalInfo = ({
    formik,
    contactMethod,
  }: {
    formik: any;
    contactMethod: "email" | "phone";
  }) => {
    const InputsObject: InputConfig[] = [
        {
            id_register: "firstName_register",
            nameInput: "Primer nombre", 
            type: "text",
            placeholder: "Primer nombre" ,
            value: formik.values.firstName_register,
            onChange: (v: string) => formik.setFieldValue("firstName_register", v),
            enablePasswordStrength: false,
            compareToPassword: undefined,
            isPassword: false,
            errors: formik.errors.firstName_register
        },
        {
            id_register: "middleName_register",
            nameInput: "Segundo nombre", 
            type: "text",
            placeholder: "Segundo nombre" ,
            value: formik.values.middleName_register,
            onChange: (v: string) => formik.setFieldValue("middleName_register", v),
            enablePasswordStrength: false,
            compareToPassword: undefined,
            isPassword: false,
            errors: formik.errors.middleName_register
        },
        {
            id_register: "lastName_register",
            nameInput: "Apellido paterno",
            type: "text",
            placeholder: "Apellido paterno" ,
            value: formik.values.lastName_register,
            onChange: (v: string) => formik.setFieldValue("lastName_register", v),
            enablePasswordStrength: false,
            compareToPassword: undefined,
            isPassword: false,
            errors: formik.errors.lastName_register
        },
        {
            id_register: "secondLastName_register",
            nameInput: "Apellido materno",
            type: "text",
            placeholder: "Apellido materno" ,
            value: formik.values.secondLastName_register,
            onChange: (v: string) => formik.setFieldValue("secondLastName_register", v),
            enablePasswordStrength: false,
            compareToPassword: undefined,
            isPassword: false,
            errors: formik.errors.secondLastName_register
        },
        {
            id_register: "numberoremail_register",
            nameInput: "Correo electrónico",
            type: contactMethod === "email" ? "email" : "tel",
            placeholder: "Correo electrónico" ,
            value: formik.values.numberoremail_register,
            onChange: (v: string) => formik.setFieldValue("numberoremail_register", v),
            enablePasswordStrength: false,
            compareToPassword: undefined,
            isPassword: false,
            errors: formik.errors.numberoremail_register
        }
    ]
    return (
      <div className="space-y-4">
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
  
        {/* Alternate contact */}
        {/* <div className="space-y-2">
          <Label htmlFor="alternativeContact">
            {contactMethod === "email" ? "Phone Number" : "Email Address"}
          </Label>
          <Input
            id="alternativeContact"
            name="alternativeContact"
            type={contactMethod === "email" ? "tel" : "email"}
            onChange={formik.handleChange}
            value={formik.values.alternativeContact}
            className={cn(
              "w-full px-5 py-3 border border-gray-300 rounded text-base",
              formik.errors.alternativeContact && "border-red-500"
            )}
          />
          {formik.errors.alternativeContact && (
            <p className="text-red-500 text-sm">
              {formik.errors.alternativeContact}
            </p>
          )}
        </div> */}
      </div>
    );
  }