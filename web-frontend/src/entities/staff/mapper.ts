import { Employee } from "./types";
import { DictionaryType } from "@/shared/config/i18n";
import { GetStaffResponse, BackendStaff } from "@/shared/api/types";

export const mapToEmployee = (
    data: GetStaffResponse,
    dictionary: DictionaryType,
): Employee[] => {
    const { sharedForm } = dictionary;

    if (!Array.isArray(data)) {
        console.warn("Expected an array for staff data, got:", data);
        return [];
    }

    return data.map((item: BackendStaff) => ({
        id: item.id,
        fio: item.fio,
        email: item.email || "-",
        phone: item.phone_number || "",
        address: item.address || "",
        filial: item.Filial?.name || "",
        role: item.Role?.name || "",
        status: item.status === "active" ? sharedForm.active : sharedForm.inactive,
    }));
};
