import { useStaff } from "../hook/use-get-staff";
import { useStaffTableColumns } from "./columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/entities/staff/types";

export const useStaffTable = () => {
    const { data: staff, isLoading, isError } = useStaff();
    const columns = useStaffTableColumns();
    const tableLogic = useTableLogic(
        staff || [],
        columns as ColumnDef<Employee>[],
    );

    return { staff, isLoading, isError, tableLogic };
};
