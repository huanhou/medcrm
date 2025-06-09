import { DictionaryType } from "@/shared/config/i18n";
import { z } from "zod";

export const createSignInSchema = (dictionary: DictionaryType) =>
    z.object({
        phone_number: z
            .string()
            .min(2, dictionary.SignInSchema.credentials.required)
            .regex(/^\+77\d{9}$/, dictionary.SignInSchema.credentials.invalid),
        password: z.string().min(1, dictionary.SignInSchema.password),
        rememberMe: z.boolean().optional(),
    });

export const Step1Schema = (_dictionary?: DictionaryType) =>
    z.object({
        fio: z.string().min(1, "Введите ФИО"),
        phone_number: z
            .string()
            .min(1, "Введите номер телефона")
            .regex(/^\+77\d{9}$/, "Некорректный номер телефона"),
        email: z.string().email("Некорректный email"),
    });

export const Step2Schema = (_dictionary?: DictionaryType) =>
    z.object({
        otp: z.string().min(1, "Введите код активации"),
    });

export const Step3Schema = (_dictionary?: DictionaryType) =>
    z
        .object({
            password: z
                .string()
                .min(8, "Пароль должен содержать минимум 8 символов")
                .regex(/[A-Z]/, "Пароль должен содержать заглавную букву")
                .regex(/[a-z]/, "Пароль должен содержать строчную букву")
                .regex(/[0-9]/, "Пароль должен содержать цифру")
                .regex(/[^A-Za-z0-9]/, "Пароль должен содержать спецсимвол"),
            confirmPassword: z.string().min(1, "Подтвердите пароль"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        });

export const getSchema = (step: number, dictionary?: DictionaryType) => {
    switch (step) {
        case 0:
            return Step1Schema(dictionary);
        case 1:
            return Step2Schema(dictionary);
        case 2:
            return Step3Schema(dictionary);
        default:
            return Step1Schema(dictionary);
    }
};
