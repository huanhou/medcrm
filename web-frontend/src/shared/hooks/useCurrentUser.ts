import { useEffect, useState, useCallback } from 'react';

export interface UserData {
    id: string;
    fio: string;
    email: string;
    phone_number: string;
    role: string;
    filial: string;
    role_code: string;
}

export function useCurrentUser() {
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchUserFromSession = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsError(false);

            const response = await fetch('/api/auth/session', {
                method: 'GET',
                credentials: 'include', // важно для cookie-сессии
            });

            if (!response.ok) {
                setUser(undefined);
                setIsError(true);
                return;
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user session:', error);
            setIsError(true);
            setUser(undefined);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserFromSession();
    }, [fetchUserFromSession]);

    const refetch = () => {
        fetchUserFromSession();
    };

    return {
        data: user,
        isLoading,
        isError,
        refetch,
    };
}
