import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createBoxOfficeSchema = (dictionary: DictionaryType) =>
    z.object({
        patient_id: z.string().min(1, dictionary.appointmentSchema.patient_id.min),
        specialist_id: z.string().min(1, dictionary.appointmentSchema.staff_id.min),
        service_id: z.array(z.string()).min(1, dictionary.boxOfficeSchema.serviceId.required),
        payment_type: z.string().min(1, dictionary.boxOfficeSchema.payment_type.required),
        comment: z.string().optional(),
        created_at: z.string().optional(),
    });

export type BoxOfficeSchema = z.infer<ReturnType<typeof createBoxOfficeSchema>>;
