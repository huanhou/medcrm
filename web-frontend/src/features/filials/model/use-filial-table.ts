import { Filial } from "@/entities/filials/types";
import { useGetFilials } from "../hook/use-get-filials";
import { useFilialsTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const useFilialsTable = () => {
    const { data: filials, isLoading, isError } = useGetFilials();
    const columns = useFilialsTableColumns();
    const tableLogic = useTableLogic(filials || [], columns as ColumnDef<Filial>[]);


    return { filials, isLoading, isError, tableLogic };
};
