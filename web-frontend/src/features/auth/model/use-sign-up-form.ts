import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Step1FormType, Step2FormType, Step3FormType } from "@/features/auth/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/shared/constants/routs";
import toast from "react-hot-toast";
import { ERROR_MESSAGE } from "@/shared/constants/errors";
import { useState, useEffect } from "react";
import { useRegisterMutation, useSetPasswordMutation } from "@/features/auth/model/model";
import { getSchema } from "./schema";

type CombinedFormType = Step1FormType & Step2FormType & Step3FormType;

export const useSignUpForm = (step: number, initialFormData: Record<string, any>) => {
    const router = useRouter();

    const { mutateAsync: registerUser, isPending: isRegistering } = useRegisterMutation();
    const { mutateAsync: setPassword, isPending: isSetPasswordPending } = useSetPasswordMutation();

    const [formData, setFormData] = useState<Partial<CombinedFormType>>(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        trigger,
        setValue,
        getValues,
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
                    setError("root", { type: "manual", message: "Пожалуйста, заполните все поля." });
                    return false;
                }
                try {
                    await registerUser({
                        full_name: fio,
                        email,
                        phone: phone_number,
                    });
                    toast.success("Пользователь зарегистрирован. Код подтверждения отправлен на email.");
                    return true;
                } catch (error: any) {
                    const message = error.response?.data?.message || "Ошибка регистрации";
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
                    setError("root", {
                        type: "manual",
                        message: "Пожалуйста, заполните все обязательные поля (email, код подтверждения и пароль).",
                    });
                    return;
                }
                await setPassword({ email, otp, password });
                toast.success("Регистрация успешно завершена.");
                router.push(`${ROUTES.home}?auth=true`);
                return;
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const serverError = error.response.data;
                const message = serverError.message || "Произошла ошибка на сервере.";
                setError("root", { type: "server", message });
                toast.error(message);
            } else if (error instanceof Error) {
                setError("root", {
                    type: "server",
                    message: "Неизвестная ошибка, попробуйте позже.",
                });
            } else {
                console.error(ERROR_MESSAGE.unknown, error);
            }
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        watch,
        errors,
        isPending: isRegistering || isSetPasswordPending,
        trigger,
        setValue,
        getValues,
        handleNextStep,
        formData,
    };
};
