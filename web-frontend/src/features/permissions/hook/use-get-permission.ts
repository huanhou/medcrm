import { useEffect, useRef, useState } from 'react';
import { useGetPermissionsQuery } from '../model/permission-api';
import { Permission } from '@/shared/api/types'; // Make sure this is the correct import path

export const usePermission = () => {
    const [safeData, setSafeData] = useState<Permission[]>([]);
    const { data, isLoading, isError, isSuccess } = useGetPermissionsQuery();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        if (Array.isArray(data) && isMounted.current) {
            setSafeData(data);
        }

        return () => {
            isMounted.current = false;
        };
    }, [data]);

    return {
        data: safeData,
        isLoading,
        isError,
        isSuccess,
    };
};
