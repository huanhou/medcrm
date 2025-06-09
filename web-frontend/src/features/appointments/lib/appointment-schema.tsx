import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createAppointmentSchema = (dictionary: DictionaryType) =>
    z.object({
        patient_id: z.string().min(1, dictionary.appointmentSchema.patient_id.min),
        specialist_id: z.string().min(1, dictionary.appointmentSchema.specialist_id.min),
        date_time: z.string().min(1, dictionary.appointmentSchema.date_time.min),
        comment: z.string(),
        service_ids: z.array(z.string()).min(1, dictionary.appointmentSchema.services.min),
        status: z.string().min(1, dictionary.appointmentSchema.status.min),
    });

export type AppointmentSchema = z.infer<ReturnType<typeof createAppointmentSchema>>;
