"use client";

import { createSignInSchema, Step1Schema, Step3Schema } from "./schema";
import { useDictionary } from "@/shared/lib/hooks";

export function useFormSchemas() {
    const { dictionary } = useDictionary();
    const signInSchema = createSignInSchema(dictionary);
    const step1Schema = Step1Schema(dictionary);
    const step3Schema = Step3Schema(dictionary);

    return { signInSchema, step1Schema, step3Schema };
}
