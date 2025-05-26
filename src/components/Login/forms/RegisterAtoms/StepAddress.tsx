"use client";
import { InputForPassword } from "../../inputs/InputForPassword";
import { AddressStepProps } from "@/types/form.types";

export const StepAddress = ({ formik }: AddressStepProps) => {
  const addressFields = [
    {
      id: "street",
      label: "Street Address",
      name: "street",
      placeholder: "Calle y número",
    },
    { id: "colony", label: "Colony", name: "colony", placeholder: "Colonia" },
    {
      id: "municipality",
      label: "Municipality",
      name: "municipality",
      placeholder: "Municipio",
    },
    { id: "state", label: "State", name: "state", placeholder: "Estado" },
    {
      id: "zipCode",
      label: "ZIP Code",
      name: "zipCode",
      placeholder: "Código postal",
    },
    { id: "country", label: "Country", name: "country", placeholder: "País" },
  ] as const;

  return (
    <div className="h-95 space-y-6">
      <header className="pb-13">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Por favor, ingrese su dirección
        </h2>
        <h4 className="text-center text-slate-400">Lo utilizamos para saber donde enviar sus futuros pedidos</h4>
      </header>
      {/* Inputs de dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addressFields.map(({ id, label, name, placeholder }) => (
          <div key={id}>
            <InputForPassword
              id={id}
              nameInput={label}
              type="text"
              placeholder={placeholder}
              isPassword={false}
              value={formik.values[name] || ""}
              onChange={(v) => formik.setFieldValue(name, v)}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="mt-1 text-red-500 text-sm">{formik.errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
