import { GetServicesResponse } from "@/shared/api/types";
import { Service } from "./types";

export const mapToServices = (data: GetServicesResponse): Service[] => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        created_at: item.created_at,
        is_active: item.is_active,
    }));
};
