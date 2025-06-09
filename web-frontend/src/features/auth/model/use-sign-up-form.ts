import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRegisterMutation, useSetPasswordMutation, useVerifyOtpMutation } from "@/features/auth/model/model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1FormType, Step2FormType, Step3FormType } from "@/features/auth/model/types";
import toast from "react-hot-toast";
import { ERROR_MESSAGE } from "@/shared/constants/errors";
import { getSchema } from "./schema";

type CombinedFormType = Step1FormType & Step2FormType & Step3FormType;

export const useSignUpForm = (step: number, initialFormData: Record<string, any>) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<CombinedFormType>>(initialFormData);
    const { mutateAsync: registerUser, isPending: isRegistering } = useRegisterMutation();
    const { mutateAsync: verifyOtp, isPending: isOtpVerifying } = useVerifyOtpMutation();
    const { mutateAsync: setPassword, isPending: isSetPasswordPending } = useSetPasswordMutation();

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        getValues,
        setValue,
    } = useForm<CombinedFormType>({
        resolver: zodResolver(getSchema(step ?? 1)),
        defaultValues: formData,
    });

    const handleNextStep = async () => {
        const isValid = await trigger();
        if (isValid) {
            const currentValues = getValues();
            setFormData(prev => ({ ...prev, ...currentValues }));

            if (step === 0) {
                const { fio, email, phone_number } = currentValues;
                if (!fio || !email || !phone_number) {
                    setError("root", { type: "manual", message: "Please fill in all fields." });
                    return false;
                }
                try {
                    await registerUser({
                        full_name: fio,
                        email,
                        phone: phone_number,
                    });
                    toast.success("User registered. OTP sent to email.");
                    return true;
                } catch (error: any) {
                    const message = error.response?.data?.message || "Registration error";
                    setError("root", { type: "manual", message });
                    toast.error(message);
                    return false;
                }
            }
            return true;
        }
        return false;
    };

    const onSubmit = async (data: Partial<CombinedFormType>) => {
        try {
            const finalData = { ...formData, ...data };
            const payload: Record<string, any> = {};

            if ("email" in finalData) payload.email = finalData.email;
            if ("otp" in finalData) payload.otp = finalData.otp;
            if ("password" in finalData) payload.password = finalData.password;

            if (step === 1 || step === 2) {
                const { email, otp, password } = payload;
                if (!email || !otp || !password) {
                    setError("root", { type: "manual", message: "Please fill in all required fields (email, OTP, password)." });
                    return;
                }
                await setPassword({ email, otp, password });
                toast.success("Registration completed successfully.");
                router.push("/home?auth=true");
                return;
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const serverError = error.response.data;
                const message = serverError.message || "Server error occurred.";
                setError("root", { type: "server", message });
                toast.error(message);
            } else if (error instanceof Error) {
                setError("root", { type: "server", message: "Unknown error, please try again later." });
            } else {
                console.error(ERROR_MESSAGE.unknown, error);
            }
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isPending: isRegistering || isOtpVerifying || isSetPasswordPending,
        trigger,
        setValue,
        getValues,
        handleNextStep,
    };
};
