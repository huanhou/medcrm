import { Input } from "./input";
import { BaseInputProps } from "../types";
import { useHookFormMask } from "use-mask-input";
import { PHONE_MASK_CONFIG } from "../../../constants/masks";
import { ReactNode } from "react";

interface PhoneInputProps extends BaseInputProps {
    registerWithMask: ReturnType<typeof useHookFormMask>;
    name: string;
    placeholder: string;
    icon?: ReactNode;
}

export const PhoneInput = ({
                               registerWithMask,
                               name,
                               placeholder,
                               icon,
                               ...props
                           }: PhoneInputProps) => {
    return (
        <Input
            inputProps={{
                type: "tel",
                placeholder,
                ...registerWithMask(name, PHONE_MASK_CONFIG.mask, {
                    required: true,
                    setValueAs: PHONE_MASK_CONFIG.transform,
                }),
            }}
            icon={icon}
            {...props}
        />
    );
};
