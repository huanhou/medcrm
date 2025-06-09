
import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { Table } from "@/features/roles/ui/table";

export const ListOfRoles = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="roles" />
            <Table />
        </DefaultLayout>
    );
};
