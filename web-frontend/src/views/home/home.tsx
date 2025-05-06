import { Breadcrumb } from "@/shared/ui";
import DefaultLayout from "@/app/DefaultLayout";

export function HomePage() {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="home" />
        </DefaultLayout>
    );
}
