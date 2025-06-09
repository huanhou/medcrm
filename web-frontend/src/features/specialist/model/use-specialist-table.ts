import { useSpecialists } from "../hook/use-get-specialist";
import { useSpecialistTableColumns } from "./columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { SpecialistEmployee } from "@/entities/specialist/types";

export const useSpecialistTable = () => {
    const { data: specialist, isLoading, isError } = useSpecialists();
    const columns = useSpecialistTableColumns();
    const tableLogic = useTableLogic(
        specialist || [],
        columns as ColumnDef<SpecialistEmployee>[]
    );

    return { specialist, isLoading, isError, tableLogic };
};
