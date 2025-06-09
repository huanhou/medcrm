'use client';

import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from 'react';
import { User } from '../types/user';
import { ERROR_MESSAGE } from '../constants/errors';

interface SessionContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    clearSession: () => void;
    refetchSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(
    undefined
);

export function LocalSessionProvider({
                                         children,
                                         initialUser = null,
                                     }: {
    children: ReactNode;
    initialUser?: User | null;
}) {
    const [user, setUserState] = useState<User | null>(initialUser);
    const [isLoading, setIsLoading] = useState(true);

    // 🔁 Load user from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            try {
                setUserState(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved user:', e);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const setUser = (user: User | null) => {
        setUserState(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    };

    const clearSession = () => {
        setUserState(null);
        localStorage.removeItem('user');
    };

    const refetchSession = async () => {
        const saved = localStorage.getItem('user');
        if (saved) {
            try {
                setUserState(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse user in refetchSession:', e);
                setUserState(null);
                localStorage.removeItem('user');
            }
        } else {
            setUserState(null);
        }
    };

    return (
        <SessionContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                setUser,
                clearSession,
                refetchSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useLocalSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error(ERROR_MESSAGE.SessionContextError);
    }
    return context;
}
