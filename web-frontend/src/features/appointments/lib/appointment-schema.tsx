import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createAppointmentSchema = (dictionary: DictionaryType) =>
    z.object({
            patient: z.string().min(1, dictionary.appointmentSchema.patient_id.min),  // Updated to match 'patient'
            specialist: z.string().min(1, dictionary.appointmentSchema.specialist_id.min),  // Updated to match 'specialist'
            service: z.string().min(1, dictionary.appointmentSchema.service.min),  // Updated to match 'service'
            appointmentDateTime: z.string().min(1, dictionary.appointmentSchema.appointmentDateTime.min),  // Updated to match 'appointmentDateTime'
            comment: z.string().optional(),  // Comment is optional
            status: z.string().min(1, dictionary.appointmentSchema.status.min),  // Updated to match 'status'
            paymentType: z.string().min(1, dictionary.appointmentSchema.paymentType.min),  // Updated to match 'paymentType'
    });

export type AppointmentSchema = z.infer<ReturnType<typeof createAppointmentSchema>>;
