
import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { CreateStaffForm } from "@/features/staff/create/ui";

export const CreateStaff = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="createStaff" />
            <CreateStaffForm />
        </DefaultLayout>
    );
};
