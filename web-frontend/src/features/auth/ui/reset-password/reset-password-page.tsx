import { CodePage } from "@/shared/ui";
import { useDictionary } from "@/shared/lib/hooks";

export const ResetPasswordPage = ({
                                      setView,
                                  }: {
    setView: (view: string) => void;
}) => {
    const { dictionary } = useDictionary();
    const handleVerification = () => {
        setView("change-password");
    };

    return (
        <CodePage
            title={dictionary.ResetPassword.enterCode}
            description={dictionary.ResetPassword.enterCodeSubText}
            onSubmit={handleVerification}
        />
    );
};
