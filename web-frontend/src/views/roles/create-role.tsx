import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { CreateRoleForm } from "@/features/roles/create/ui";

export const CreateRole = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="createRole" />
            <CreateRoleForm />
        </DefaultLayout>
    );
};
