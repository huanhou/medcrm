import { z } from 'zod';
import { DictionaryType } from '@/shared/config/i18n';

export const createRoleSchema = (dictionary: DictionaryType) =>
    z.object({
        roleName: z.string().min(2, dictionary.roleSchema.name.min),

        permission: z.array(z.string()).min(1, dictionary.roleSchema.permissions.min),
    });

export type RolesSchema = ReturnType<typeof createRoleSchema>['_type'];
