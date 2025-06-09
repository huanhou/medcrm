import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createFilialSchema = (dictionary: DictionaryType) =>
    z.object({
        name: z.string().min(1, dictionary.filialSchema.name.required),
        address: z.string().min(1, dictionary.filialSchema.address.required),
        phone: z.string().min(1, dictionary.filialSchema.phone.required),
        email: z.string().min(1, dictionary.filialSchema.email.required),
        status: z.enum(['active', 'inactive'], {
            errorMap: () => ({ message: dictionary.SignUpSchema.status.required }),
        }),
    });

export type FilialSchema = z.infer<ReturnType<typeof createFilialSchema>>;
