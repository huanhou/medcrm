'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCurrentUser, UserData } from '../hooks/useCurrentUser';

interface UserContextType {
    user: UserData | undefined;
    isLoading: boolean;
    isError: boolean;
    refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { data: user, isLoading, isError, refetch } = useCurrentUser();

    const refetchUser = React.useCallback(() => {
        refetch();
    }, [refetch]);

    const value = React.useMemo(() => {
        return {
            user,
            isLoading,
            isError,
            refetchUser,
        };
    }, [user, isLoading, isError, refetchUser]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser должен использоваться внутри UserProvider');
    }
    return context;
}
