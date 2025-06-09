import { CodePage } from "@/shared/ui";
import { useDictionary } from "@/shared/lib/hooks";

export const VerificationPage = ({
                                     setView,
                                 }: {
    setView: (view: string) => void;
}) => {
    const handleVerification = () => {
        setView("verified");
    };

    const { dictionary } = useDictionary();

    return (
        <CodePage
            title={dictionary.Verification.title}
            description={dictionary.Verification.enterCode}
            onSubmit={handleVerification}
        />
    );
};
