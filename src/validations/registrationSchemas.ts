import * as z from "zod";

export const formSchema = z
  .object({
    // Step 1: Contact
    contactMethod: z.enum(["email", "phone"]),
    identifier: z.string().min(1, "Required"),
    username: z.string().min(3, "Username must be at least 3 characters"),

    // Step 2: Verification
    verificationCode: z.string().length(6, "Must be 6 digits"),

    // Step 3: Password
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),

    // Step 4: Personal Info
    firstName: z.string().min(1, "Required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Required"),
    secondLastName: z.string().optional(),
    alternativeContact: z.string().min(1, "Required"),
    birthDate: z.date(),

    // Step 5: Address
    street: z.string(),
    colony: z.string(),
    municipality: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),

    // Step 6: Preferences
    newsletter: z.boolean(),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

 export const stepSchemas = {
    1: z.object({
      contactMethod: z.enum(["email", "phone"]),
      identifier: z.string().min(1, "Required"),
      username: z.string().min(3, "Username must be at least 3 characters"),
    }),
    2: z.object({
      verificationCode: z.string().length(6, "Must be 6 digits"),
    }),
    3: z
      .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }),
    4: z.object({
      firstName: z.string().min(1, "Required"),
      middleName: z.string().optional(),
      lastName: z.string().min(1, "Required"),
      secondLastName: z.string().optional(),
      alternativeContact: z.string().min(1, "Required"),
      birthDate: z.date(),
    }),
    5: z.object({
      street: z.string(),
      colony: z.string(),
      municipality: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string(),
    }),
    6: z.object({
      newsletter: z.boolean(),
      termsAccepted: z.boolean(),
    }),
  };