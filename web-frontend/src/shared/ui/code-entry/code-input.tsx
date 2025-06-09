import { FC } from "react";
import { Input } from "@/shared/ui";
import { useFormContext } from "react-hook-form";

interface ResetCodeInputProps {
    length: number;
}

export const CodeInput: FC<ResetCodeInputProps> = ({ length }) => {
    const { register } = useFormContext();

    return (
        <div className="flex items-center gap-4.5">
            {Array.from({ length }, (_, index) => (
                <Input
                    key={index}
                    inputProps={{
                        type: "text",
                        maxLength: 1,
                        ...register(`code[${index}]`),
                    }}
                    className="text-center"
                />
            ))}
        </div>
    );
};
