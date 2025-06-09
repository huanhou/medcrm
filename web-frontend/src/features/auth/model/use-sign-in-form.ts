import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignInFormData } from "@/features/auth/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/shared/constants/routs";
import { useFormSchemas } from "@/features/auth/model/use-form";
import { mapServerMessageToDictionary } from "@/features/auth/model/map-server-message";
import { useDictionary } from "@/shared/lib/hooks";
import toast from "react-hot-toast";
import { ERROR_MESSAGE } from "@/shared/constants/errors";
import { useSignInMutation } from "@/features/auth/model/model";
import { StaffSignInBodyDto} from "@/shared/api/types";
export const useSignInForm = () => {
    const { dictionary } = useDictionary();
    const router = useRouter();
    const { signInSchema } = useFormSchemas();
    const { mutateAsync: signIn, isPending, isError } = useSignInMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        const { rememberMe, phone_number, password } = data;

        // Create payload matching StaffSignInBodyDto
        const payload: StaffSignInBodyDto = {
            phone_number, // keep snake_case here, as expected by backend type
            password,
        };

        try {
            await signIn(payload);

            if (rememberMe) {
                document.cookie = `remember-me=${rememberMe}; path=/; max-age=${7 * 24 * 60 * 60}; secure; sameSite=lax`;
            }

            toast.success(dictionary.notifications.loginSuccess);
            router.push("/ru/staff");
            ;
        } catch (error: any) {
            // error handling as before
        }
    };


    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isPending,
        isError,
        watch,
    };
};
