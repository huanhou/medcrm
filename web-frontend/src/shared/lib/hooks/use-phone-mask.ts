import { UseFormRegister } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

export const usePhoneMask = (register: UseFormRegister<any>) => {
    const registerWithMask = useHookFormMask(register);

    return (fieldName: string) => {
        return registerWithMask(fieldName, ["+7 (999) 999-99-99"], {
            required: true,
            setValueAs: (value: string) => {
                const digitsOnly = value.replace(/\D/g, "");
                return `+${digitsOnly}`;
            },
        });
    };
};
