import { useDictionary } from "@/shared/lib/hooks";
import { Lock, Input, Button } from "@/shared/ui";

export function ChangePasswordForm({
                                       setView,
                                   }: {
    setView: (view: string) => void;
}) {
    const { dictionary } = useDictionary();

    return (
        <div>
            <form onSubmit={() => setView("success")} className="space-y-4">
                <Input
                    label={dictionary.ResetPassword.password}
                    inputProps={{
                        type: "password",
                    }}
                    className="mb-4.5"
                    icon={<Lock />}
                />

                <Input
                    label={dictionary.ResetPassword.checkPassword}
                    inputProps={{
                        type: "password",
                    }}
                    className="mb-4.5"
                    icon={<Lock />}
                />

                <Button
                    variant="primary"
                    type="submit"
                    className="w-full rounded-[10px] mt-4 justify-center disabled:opacity-50"
                >
                    {dictionary.ResetPassword.changePassword}
                </Button>
            </form>
        </div>
    );
}
