

import { FormikProps } from "formik";
import { AddressStepProps, ContactStepProps, FormValues, PasswordStepProps, PersonalInfoStepProps, PreferencesStepProps, VerificationStepProps } from "@/types/form.types";
import { StepAddress} from '../components/Login/forms/RegisterAtoms/StepAddress';
import { StepContact } from "../components/Login/forms/RegisterAtoms/StepContact";
import { StepPassword } from "../components/Login/forms/RegisterAtoms/StepPassword";
import { StepPersonalInfo } from "../components/Login/forms/RegisterAtoms/StepPersonalInfo";
import { StepPreferences } from "../components/Login/forms/RegisterAtoms/StepPreferences";
import { StepVerification } from "../components/Login/forms/RegisterAtoms/StepVerification";




export type StepItem<T = unknown> = {
  number: number;
  title: string;
  Component: React.ComponentType<T>;
  props: T;
};

export type UseRegistrationStepsArgs = {
  formik: FormikProps<FormValues>;
  contactMethod: "email" | "phone";
  setContactMethod: React.Dispatch<React.SetStateAction<"email" | "phone">>;
  date: Date | undefined;
  /** ¡OJO! — ahora el tipo correcto */
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  handlers: {
    handleContactSuccess: () => void;
    handleVerificationSuccess: (code: string) => void;
  };
};

export function useRegistrationSteps (args:{
 formik: FormikProps<FormValues>;
  contactMethod: "email"|"phone";
  setContactMethod: React.Dispatch<React.SetStateAction<"email"|"phone">>;
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date|undefined>>;
  handlers: {
    handleContactSuccess:    () => void;
    handleVerificationSuccess: (code: string) => void;
  };
}) {
  const { formik, contactMethod, setContactMethod, date, setDate, handlers } = args;

    const steps:[
    StepItem<ContactStepProps>,
    StepItem<VerificationStepProps>,
    StepItem<PasswordStepProps>,
    StepItem<PersonalInfoStepProps>,
    StepItem<AddressStepProps>,
    StepItem<PreferencesStepProps>
  ]  = [
     /* 1 ─ Contacto */
    {
      number: 1,
      title: "Contacto",
      Component: StepContact,
      props: {
        formik,
        contactMethod,
        setContactMethod,
        onSuccess: handlers.handleContactSuccess,
      },
    },

    /* 2 ─ Verificación */
    {
      number: 2,
      title: "Verificación",
      Component: StepVerification,
      props: {
        formik,
        contactMethod,
        destination: formik.values.identifier,
        goNext: handlers.handleVerificationSuccess,
      },
    },

    /* 3 ─ Contraseña */
    {
      number: 3,
      title: "Contraseña",
      Component: StepPassword,
      props: { formik },
    },

    /* 4 ─ Información personal */
    {
      number: 4,
      title: "Información personal",
      Component: StepPersonalInfo as React.ComponentType<PersonalInfoStepProps>,
      props: {
        formik,
        contactMethod,
        date,
        setDate,
      },
    },

    /* 5 ─ Dirección (opcional) */
    {
      number: 5,
      title: "Dirección",
      Component: StepAddress,
      props: {
        formik,
        date,
        setDate,
      },
    },

    /* 6 ─ Preferencias */
    {
      number: 6,
      title: "Preferencias",
      Component: StepPreferences,
      props: { formik },
    },
    
  ];

  return steps ;
};

