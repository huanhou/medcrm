import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createServiceSchema = (dictionary: DictionaryType) =>
    z.object({
        name: z.string().min(3, dictionary.serviceSchema.name.required),
        description: z.string().min(1, dictionary.serviceSchema.description.required),
        price: z
            .string()
            .min(1, dictionary.serviceSchema.price.required)
            .regex(/^\d+(\.\d{0,2})?$/, dictionary.serviceSchema.price.invalid),
        isAvailable: z.boolean(),
    });

export type ServiceSchema = z.infer<ReturnType<typeof createServiceSchema>>;
