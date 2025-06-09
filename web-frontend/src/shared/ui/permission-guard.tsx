'use client';

import { ReactNode } from 'react';
import { usePermissions } from '../context/permission-context';

interface PermissionGuardProps {
    permissionCode: string;
    children: ReactNode;
    fallback?: ReactNode;
}
export function PermissionGuard({ permissionCode, children, fallback = null }: PermissionGuardProps) {
    const { hasPermission, isLoading } = usePermissions();

    if (isLoading) {
        return null;
    }

    if (hasPermission(permissionCode)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}

export function usePermissionCheck(permissionCode: string) {
    const { hasPermission, isLoading } = usePermissions();

    return {
        hasPermission: hasPermission(permissionCode),
        isLoading,
    };
}
