import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { Table } from "@/features/permissions/ui/table";

export const ListOfPermissions = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="permissions" />
            <Table />
        </DefaultLayout>
    );
};
