import { SpecialistEmployee } from "./types";
import { DictionaryType } from "@/shared/config/i18n";
import { BackendSpecialist } from "@/shared/api/types";

export const mapToSpecialistEmployee = (
    data: BackendSpecialist[] | any,  // Allow any to catch errors in case data is not the expected type
    dictionary: DictionaryType
): SpecialistEmployee[] => {
    const { sharedForm } = dictionary;

    // Check if 'data' is an array before using .map()
    if (!Array.isArray(data)) {
        console.error("Expected data to be an array, but got:", data);
        return [];  // Return an empty array or handle it as needed
    }

    // Explicitly type the 'item' parameter as BackendSpecialist
    return data.map((item: BackendSpecialist) => ({
        id: item.id,
        fio: item.fio,
        phone: item.phone_number || "",
        iin: item.iin,
        filial: item.Filial?.name,
        status: item.status === "active" ? sharedForm.active : sharedForm.inactive,
        internal: item.Internal ? sharedForm.internal : sharedForm.external,
    }));
};
