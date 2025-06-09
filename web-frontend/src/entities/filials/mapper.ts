import { GetFilialsResponse } from "@/shared/api/types";
import { Filial } from "./types";
import { DictionaryType } from "@/shared/config/i18n";

export const mapToFilials = (dictionary: DictionaryType,
                             data: GetFilialsResponse): Filial[] => {
    const { sharedForm } = dictionary;

    return data.map((item) => ({
        id: item.id,
        name: item.name,
        address: item.address || "",
        phone: item.phone,
        email: item.email,
        status: item.status === "active" ? sharedForm.active : sharedForm.inactive,
    }));
};
