import { useDictionary } from "@/shared/lib/hooks";
import { Telegram, Input, Button } from "@/shared/ui";

export function TelegramForm({ setView }: { setView: (view: string) => void }) {
    const { dictionary } = useDictionary();

    return (
        <div>
            <form onSubmit={() => setView("reset-password")} className="space-y-4">
                <Input
                    label={dictionary.ResetPassword.Telegram}
                    inputProps={{
                        type: "text",
                    }}
                    className="mb-4.5"
                    icon={<Telegram />}
                />

                <Button
                    variant="primary"
                    type="submit"
                    className="w-full rounded-[10px] mt-4 justify-center disabled:opacity-50"
                >
                    {dictionary.ResetPassword.Continue}
                </Button>
            </form>
        </div>
    );
}
