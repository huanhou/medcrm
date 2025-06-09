import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createPatientSchema = (dictionary: DictionaryType) =>
    z.object({
        fio: z
            .string()
            .refine(
                (value) => value.split(' ').length >= 2 && value.split(' ').length <= 3,
                dictionary.patientSchema.fio.min
            ),
        phone: z
            .string()
            .min(2, dictionary.SignUpSchema.phone.required)
            .regex(/^\+77\d{9}$/, dictionary.SignUpSchema.phone.invalid),
        iin: z
            .string()
            .min(1, dictionary.patientSchema.iin.required)
            .refine((value) => /^\d+$/.test(value), dictionary.patientSchema.iin.number)
            .refine((value) => value.toString().length === 12, dictionary.patientSchema.iin.length),
        // address: z.string().min(1, dictionary.patientSchema.address.min),
        filial_id: z.string().min(1, dictionary.patientSchema.filial_id.min),
        description: z.string().min(1, dictionary.expenseCategorySchema.description.required),
    });

export type PatientSchema = z.infer<ReturnType<typeof createPatientSchema>>;

