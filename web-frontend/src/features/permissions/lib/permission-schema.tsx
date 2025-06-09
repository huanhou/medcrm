import { z } from "zod";
import { DictionaryType } from "@/shared/config/i18n";

export const createPermissionSchema = (dictionary: DictionaryType) =>
    z.object({
        name: z.string().min(3, dictionary.permissionSchema.name.min),
        description: z.string().min(1, dictionary.permissionSchema.description.min),
        code: z.string().min(1, dictionary.permissionSchema.code.min),
    });

export type PermissionSchema = z.infer<
    ReturnType<typeof createPermissionSchema>
>;
