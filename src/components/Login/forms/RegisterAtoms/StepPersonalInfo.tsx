"use client";
import { InputForPassword } from "../../inputs/InputForPassword";
import { DatePicker } from "@/components/calendario/datepicker";
import { PersonalInfoStepProps } from "@/types/form.types";

interface InputConfig {
  id_register: string;
  nameInput: string;
  type: string;
  placeholder: string;
  isPassword?: boolean;
  value: string | undefined;
  onChange: (v: string) => void;
  enablePasswordStrength?: boolean;
  compareToPassword?: string;
  errors?: Record<string, string>;
}

export const StepPersonalInfo = ({
  formik,
  contactMethod,
  date,
  setDate,
}: PersonalInfoStepProps & {
  date: Date | undefined;
  setDate: (d: Date) => void;
}) => {
  const InputsObject: InputConfig[] = [
    {
      id_register: "firstName",
      nameInput: "Primer nombre",
      type: "text",
      placeholder: "Primer nombre",
      value: formik.values.firstName,
      onChange: (v) => formik.setFieldValue("firstName", v),
      isPassword: false,
      enablePasswordStrength: false,
      errors: formik.errors,
    },
    {
      id_register: "middleName",
      nameInput: "Segundo nombre",
      type: "text",
      placeholder: "Segundo nombre",
      value: formik.values.middleName || "",
      onChange: (v) => formik.setFieldValue("middleName", v),
      isPassword: false,
      enablePasswordStrength: false,
      errors: formik.errors,
    },
    {
      id_register: "lastName",
      nameInput: "Apellido paterno",
      type: "text",
      placeholder: "Apellido paterno",
      value: formik.values.lastName,
      onChange: (v) => formik.setFieldValue("lastName", v),
      isPassword: false,
      enablePasswordStrength: false,
      errors: formik.errors,
    },
    {
      id_register: "secondLastName",
      nameInput: "Apellido materno",
      type: "text",
      placeholder: "Apellido materno",
      value: formik.values.secondLastName,
      onChange: (v) => formik.setFieldValue("secondLastName", v),
      isPassword: false,
      enablePasswordStrength: false,
      errors: formik.errors,
    },
    {
      id_register: "alternativeContact",
      nameInput: contactMethod === "email" ? "Teléfono" : "Correo electrónico",
      type: contactMethod === "email" ? "tel" : "email",
      placeholder:
        contactMethod === "email" ? "Número de teléfono" : "Correo electrónico",
      value: formik.values.alternativeContact,
      onChange: (v) => formik.setFieldValue("alternativeContact", v),
      isPassword: false,
      enablePasswordStrength: false,
      errors: formik.errors,
    },
  ];

  return (
    <div className="h-95 space-y-6">
  {/* ------------ encabezado ------------ */}
  <header className="pb-12 col-span-2">
    <h2 className="mb-3 text-3xl font-bold text-center">
      Por favor, ingrese su información personal
    </h2>
    <h4 className="text-center text-slate-400">
      Para integrar su información en el sistema
    </h4>
  </header>

  {/* ------------ grid 2 × 3 ------------ */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* 1 / 6  Fecha de nacimiento */}
    <div className="space-y-2">
      <DatePicker
        value={date}
        onChange={(d) => {
          setDate(d);
          formik.setFieldValue("birthDate", d);
        }}
      />
      {formik.touched.birthDate && formik.errors.birthDate && (
        <p className="text-red-500 text-sm">{formik.errors.birthDate}</p>
      )}
    </div>

    {/* 2-6 / 6  Inputs */}
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
        <div key={id_register}>
          <InputForPassword
            id={id_register}
            nameInput={nameInput}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(v) => {
              onChange(v);
              formik.setFieldTouched(id_register, true);
            }}
            enablePasswordStrength={enablePasswordStrength}
            compareToPassword={compareToPassword}
            isPassword={isPassword}
          />
          {errors && errors[id_register] && (
            <p className="text-red-500 text-sm">{errors[id_register]}</p>
          )}
        </div>
      )
    )}
  </div>
</div>
  );
};
