export type ContactRequest = {
  provider: 'credentials';
  method: 'email' | 'phone';
  identifier: string;
  //username: string;
}
export interface ContactData {
  skip: boolean;
  message: string;
}

export interface VerificationRequest {
  verificationCode: string;
  identifier: string;
  method: 'email' | 'phone';
}

export interface PasswordRequest {
  password: string;
  confirmPassword: string;
  username: string;
}

export interface Address {
  street: string;
  colony: string;
  municipality: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ProfileRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName: string;
  alternativeContact: string;
  birthDate: string;
  address: Address;
}

export interface CompleteRegistrationRequest {
  newsletter: boolean;
  termsAccepted: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 