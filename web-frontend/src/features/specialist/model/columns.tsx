import { useMemo } from "react";
import { useDictionary } from "@/shared/lib/hooks";
import { createColumnHelper } from "@tanstack/table-core";
import { Checkbox } from "@/shared/ui";
import { SpecialistEmployee } from "@/entities/specialist/types";

const columnHelper = createColumnHelper<SpecialistEmployee>();

export const useSpecialistTableColumns = () => {
    const { dictionary } = useDictionary();
    const { headers, sharedForm } = dictionary;

    return useMemo(() => [
        columnHelper.display({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    className="checkbox"
                />
            ),
            size: 10,
        }),
        columnHelper.accessor("id", {
            header: headers.id,
            cell: (info) => String(info.getValue()).slice(0, 4).toUpperCase(),
        }),
        columnHelper.accessor("fio", {
            header: headers.name,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("phone", {
            header: headers.phone,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("iin", {
            header: "ИИН",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('filial', {
            header: headers.filial,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("internal", {
            header: "Внутренний",
            cell: (info) => (info.getValue() ? "Да" : "Нет"),
        }),
        columnHelper.accessor("status", {
            header: headers.status,
            cell: (info) => (
                <div
                    className={`${info.row.original.status === sharedForm.active
                        ? "bg-[#5BB79A] text-white"
                        : "bg-gray-1 text-gray-6"
                    } p-2 rounded text-center`}
                >
                    {info.getValue()}
                </div>
            ),
        }),
    ], [headers, sharedForm]);
};