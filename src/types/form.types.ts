import { FormikProps } from 'formik';

export interface FormValues {
  // Step 1: Contact
  contactMethod: "email" | "phone";
  identifier: string;
  username: string;

  // Step 2: Verification
  verificationCode: string;

  // Step 3: Password
  password: string;
  confirmPassword: string;

  // Step 4: Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  alternativeContact: string;

  // Step 5: Address
  birthDate?: Date;
  street: string;
  colony: string;
  municipality: string;
  state: string;
  zipCode: string;
  country: string;

  // Step 6: Preferences
  newsletter: boolean;
  termsAccepted: boolean;
}

// Props base para todos los pasos
export interface BaseStepProps {
  formik: FormikProps<FormValues>;
  contactMethod: "email" | "phone";
  setContactMethod: React.Dispatch<React.SetStateAction<"email" | "phone">>;
  destination?: string;
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  goNext?: (code: string) => void;
}

// Props específicos para cada paso
export interface ContactStepProps extends BaseStepProps {
  contactMethod: "email" | "phone";
  setContactMethod: React.Dispatch<React.SetStateAction<"email" | "phone">>;
  onSuccess: () => void;
}

export type VerificationStepProps = Pick<BaseStepProps, 'formik' | 'contactMethod' | 'destination' | 'goNext'>;

export type PasswordStepProps = Pick<BaseStepProps, 'formik'>;

export type PersonalInfoStepProps = Pick<BaseStepProps, 'formik' | 'contactMethod' | 'date' | 'setDate'>;

export type AddressStepProps = Pick<BaseStepProps, 'formik' | 'date' | 'setDate'>;

export type PreferencesStepProps = Pick<BaseStepProps, 'formik'>;

// Props generales para el formulario
export type FormikStepProps = BaseStepProps; 