import { z } from "zod";
import { DictionaryType } from "@/shared/config/i18n";

export const createSpecialistSchema = (dictionary: DictionaryType) =>
    z.object({
        name: z
            .string()
            .min(1, dictionary.SignUpSchema.fullName.required)
            .refine(
                (value) => value.split(" ").length >= 2 && value.split(" ").length <= 3,
                dictionary.SignUpSchema.fullName.invalid
            ),
        phoneNumber: z
            .string()
            .min(2, dictionary.SignUpSchema.phone.required)
            .regex(/^\+77\d{9}$/, dictionary.SignUpSchema.phone.invalid),
        iin: z
            .string()
            .length(12, "ИИН должен содержать 12 цифр")
            .regex(/^\d+$/, "ИИН должен состоять только из цифр"),
        status: z.enum(["active", "inactive"], {
            errorMap: () => ({
                message: dictionary.SignUpSchema.status.required,
            }),
        }),
        specialistType: z.enum(["Внешний", "Внутренний"], {}),
        branch: z.string().min(1, "Branch name is required"),  // Changed from UUID to branch name (similar to Staff Schema)
    });

export type SpecialistSchemaType = ReturnType<typeof createSpecialistSchema>["_type"];
