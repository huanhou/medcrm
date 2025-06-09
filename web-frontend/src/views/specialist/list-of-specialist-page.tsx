import DefaultLayout from "@/app/DefaultLayout";
import { Breadcrumb } from "@/shared/ui";
import { Table } from "@/features/specialist/ui/table";

export const ListOfSpecialistPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="specialistList" />
            <Table />
        </DefaultLayout>
    );
};
