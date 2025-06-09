import { Appointment } from "@/entities/appointment/types";
import { useGetAppointments } from "../hook/use-get-appointment";
import { useAppointmentsTableColumns } from "../lib/columns";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const useAppointmentsTable = () => {
    const { data: appointments, isLoading, isError } = useGetAppointments();
    const columns = useAppointmentsTableColumns();
    const tableLogic = useTableLogic(appointments || [], columns as ColumnDef<Appointment>[]);

    return { appointments, isLoading, isError, tableLogic };
};
