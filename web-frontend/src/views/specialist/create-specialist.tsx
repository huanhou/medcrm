import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { CreateSpecialistForm } from "@/features/specialist/create/ui";

export const CreateSpecialist = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="createSpecialist" />
            <CreateSpecialistForm />
        </DefaultLayout>
    );
};
