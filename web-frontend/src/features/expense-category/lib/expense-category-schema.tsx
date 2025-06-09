import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createExpenseCategorySchema = (dictionary: DictionaryType) =>
    z.object({
        name: z.string().min(1, dictionary.expenseCategorySchema.name.required),
        description: z.string().min(1, dictionary.expenseCategorySchema.description.required),
    });

export type ExpenseCategorySchema = z.infer<ReturnType<typeof createExpenseCategorySchema>>;
