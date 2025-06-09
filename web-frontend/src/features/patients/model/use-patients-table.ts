import { useGetPatients } from "../hook/use-get-patients";
import { usePatientsTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import type { Patient } from "@/entities/patients/types";

export const usePatientsTable = () => {
    const { data: patients, isLoading, isError } = useGetPatients();
    const columns = usePatientsTableColumns();
    const tableLogic = useTableLogic<Patient>(patients || [], columns as ColumnDef<Patient>[]);

    return { patients, isLoading, isError, tableLogic };
};