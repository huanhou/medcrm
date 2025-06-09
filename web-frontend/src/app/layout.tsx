import '@/app/css/style.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { QueryProvider, ThemeProvider, UserProvider } from './providers';
import { Toaster } from 'react-hot-toast';
import { User } from '@/shared/types/user';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import { ERROR_MESSAGE } from '@/shared/constants/errors';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: 'med-crm Cabinet',
    description: 'A modern web application for managing and organizing your cabinet efficiently.',
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    let user: User | null = null;

    if (typeof window === 'undefined') {
        try {
            const headersList = await headers();
            const userHeader = headersList.get('x-user-data');

            if (userHeader) {
                try {
                    const decodedHeader = Buffer.from(userHeader, 'base64').toString('utf-8');
                    user = JSON.parse(decodedHeader) as User;
                } catch (e) {
                    console.error(ERROR_MESSAGE.USER_CONTEXT_ERROR_DETAILLED, e);
                }
            }

            if (!user) {
                const cookieHeader = headersList.get('cookie');
                if (cookieHeader) {
                    const cookieMatch = cookieHeader.match(/x-user-data=([^;]+)/);
                    if (cookieMatch && cookieMatch[1]) {
                        try {
                            const decodedCookie = Buffer.from(cookieMatch[1], 'base64').toString('utf-8');
                            user = JSON.parse(decodedCookie) as User;
                        } catch (e) {
                            console.error(ERROR_MESSAGE.USER_CONTEXT_ERROR_DETAILLED, e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(ERROR_MESSAGE.USER_CONTEXT_ERROR_DETAILLED, error);
        }
    }

    return (
        <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            <QueryProvider>
                <UserProvider user={user}>
                    <Toaster />
                    {children}
                </UserProvider>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
