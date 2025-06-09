export interface Permission {
    id: string;
    name: string;
    description: string;
    code: string;
    created_at: string;
    deleted_at: string | null;
}

export interface Role {
    id: string;
    name: string;
    code: string;
    created_at: string;
    deleted_at: string | null;
    _count?: {
        Staff: number;
    };
    Permissions: Permission[];
}

export interface PermissionCheckResult {
    hasPermission: boolean;
    isLoading: boolean;
}