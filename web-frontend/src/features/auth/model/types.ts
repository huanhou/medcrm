import { z } from "zod";
import { useFormSchemas } from "@/features/auth/model/use-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { signInSchema } = useFormSchemas();

export type SignInFormData = z.infer<typeof signInSchema>;

export interface Step1FormType {
    fio: string;
    phone_number: string;
    email: string;
}

export interface Step2FormType {
    otp: string;
}

export interface Step3FormType {
    password: string;
    confirmPassword: string;
}

export type CombinedFormType = Step1FormType & Step2FormType & Step3FormType;
