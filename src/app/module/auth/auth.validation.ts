import z from "zod";
const patientRegistrationZodSchema = z.object({
  name: z
    .string("Not A String!!!")
    .min(3, "Name must atleast 3 character long !!"),
  email: z.email("Not Email !!"),
  // Zod Password validation form google
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long..")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),

  patient: z.object({
    contactNumber: z.string().optional(),
    age: z.number(),
  }),
});

const loginZodSchema = z.object ({
  email: z.email(),
  password:z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long..")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
})

export const UserValidation = {
  patientRegistrationZodSchema,
  loginZodSchema,
  
};
