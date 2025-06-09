import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createExpenseSchema = (dictionary: DictionaryType) =>
    z.object({
        category_id: z.string().min(1, dictionary.expenseSchema.category_id.required),
        amount: z
            .string()
            .min(1, dictionary.expenseSchema.amount.required)
            .regex(/^\d+(\.\d{0,2})?$/, dictionary.expenseSchema.amount.invalid),
        description: z.string().min(1, dictionary.expenseSchema.description.required),
    });

export type ExpenseSchema = z.infer<ReturnType<typeof createExpenseSchema>>;
