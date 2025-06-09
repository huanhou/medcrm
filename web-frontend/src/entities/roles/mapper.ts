import { GetRolesResponse } from "@/shared/api/types";
import { Role } from "./types";

export const mapToRoles = (data: GetRolesResponse): Role[] => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        permissions: item.Permissions?.map((p: any) => p.name).join(", ") || "",
        staffCount: item._count?.Staff || 0,
    }));
};
