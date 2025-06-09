import { GetPatientsResponse } from "@/shared/api/types";
import { Patient } from "./types";

export const mapToPatients = (data: GetPatientsResponse): Patient[] => {
    return data.map((item) => ({
        id: item.id,
        fio: item.fio,
        phone: item.phone,
        address: item.address,
        filial: item?.Filial?.name || 'Неизвестно',
        iin: item.iin,
        created_at: item.created_at,
    }));
};
