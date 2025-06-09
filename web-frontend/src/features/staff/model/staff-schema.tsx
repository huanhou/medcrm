import { z } from "zod";
import { DictionaryType } from "@/shared/config/i18n";

export const createStaffSchema = (dictionary: DictionaryType) =>
    z.object({
        fullName: z  // Changed from fio to full_name to match backend
            .string()
            .min(1, dictionary.SignUpSchema.fullName.required)
            .refine(
                (value) => value.split(' ').length >= 2 && value.split(' ').length <= 3,
                dictionary.SignUpSchema.fullName.invalid,
            ),
        password: z
            .string()
            .min(8, dictionary.SignUpSchema.password.minLength)
            .regex(/[A-Z]/, dictionary.SignUpSchema.password.uppercase)
            .regex(/[a-z]/, dictionary.SignUpSchema.password.lowercase)
            .regex(/[0-9]/, dictionary.SignUpSchema.password.digit)
            .regex(/[@$!%*#?&.,]/, dictionary.SignUpSchema.password.specialCharacter)
            .optional(),
        email: z
            .string()
            .email(dictionary.SignUpSchema.email)
            .min(1, dictionary.SignUpSchema.email),
        phone: z
            .string()
            .min(2, dictionary.SignUpSchema.phone.required)
            .regex(/^\+77\d{9}$/, dictionary.SignUpSchema.phone.invalid),
        address: z.string().min(3, dictionary.SignUpSchema.address.required),
        branch: z.string().min(1, dictionary.SignUpSchema.filialId.required), // branch is expected as a name
        role: z.string().min(1, dictionary.SignUpSchema.filialId.required),   // role is expected as a name
        status: z.enum(["active", "inactive"], {
            errorMap: () => ({ message: dictionary.SignUpSchema.status.required }),
        }),
    });

export type StaffSchemaType = ReturnType<typeof createStaffSchema>["_type"];
