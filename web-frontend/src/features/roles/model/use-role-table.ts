import { useRole } from "../hook/use-get-role";
import { useRolesTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/entities/roles/types";

export const useRolefTable = () => {
    const { data: staff, isLoading, isError } = useRole();
    const columns = useRolesTableColumns();
    const tableLogic = useTableLogic(staff || [], columns as ColumnDef<Role>[]);

    return { staff, isLoading, isError, tableLogic };
};
