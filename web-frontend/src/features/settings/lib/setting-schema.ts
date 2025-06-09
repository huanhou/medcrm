import { z } from "zod";

import { DictionaryType } from "@/shared/config/i18n";

export const settingsSchema = (dictionary: DictionaryType) =>
    z.object({
        organization_name: z
            .string()
            .min(1, dictionary.OrganisationForm.name.required),
        phone: z
            .string()
            .min(2, dictionary.SignUpSchema.phone.required)
            .regex(/^\+7\d{10}$/, dictionary.SignUpSchema.phone.invalid),
        iin_bin: z.string().min(1, dictionary.SignUpSchema.iin_bin.required),
        legal_address: z.string().min(1, dictionary.OrganisationForm.legal_address.required),
        director: z.string().min(1, dictionary.OrganisationForm.director.required),
        bio: z.string().min(1, dictionary.OrganisationForm.bio.required),
        logo: z.string().optional(),
    });

export type SettingsSchema = z.infer<ReturnType<typeof settingsSchema>>;
