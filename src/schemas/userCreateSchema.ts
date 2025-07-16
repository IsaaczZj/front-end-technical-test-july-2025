import z, { email } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(4, { message: "Digite um nome maior" }),
  email: z.email({ message: "Digite um email válido" }),
  city: z.string().min(2, { message: "Digite uma cidade válida" }),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
