import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { Table } from "@/features/staff/ui/table";

export const ListOfStaffPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="staffList" />
            <Table />
        </DefaultLayout>
    );
};
