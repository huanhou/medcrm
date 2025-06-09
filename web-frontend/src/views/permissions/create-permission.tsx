import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { CreatePermissionForm } from "@/features/permissions/create/ui";

export const CreatePermission = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="createPermission" />
            <CreatePermissionForm />
        </DefaultLayout>
    );
};
