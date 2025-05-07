import * as z from "zod";
const contactMethodSchema = z.object({
    contactMethod: z.enum(["email", "phone"]),
    identifier: z.string().min(1, "Required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
  });
  
  const verificationSchema = z.object({
    verificationCode: z.string().length(6, "Must be 6 digits"),
  });
  
  const passwordSchema = z
    .object({
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  
  const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Required"),
    secondLastName: z.string().min(1, "Required"),
    alternativeContact: z.string().min(1, "Required"),
  });
  
  const addressSchema = z.object({
    birthDate: z.date().optional(),
    street: z.string().optional(),
    colony: z.string().optional(),
    municipality: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  });
  
  const preferencesSchema = z.object({
    newsletter: z.boolean().default(false),
    termsAccepted: z.boolean().default(false),
  });