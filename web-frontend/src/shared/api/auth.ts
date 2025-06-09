import { ERROR_MESSAGE } from '../constants/errors';
import { User } from '../types/user';
export async function login(phoneNumber: string, password: string): Promise<User> {
    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, password }),
        });

        if (!response.ok) {
            throw new Error(ERROR_MESSAGE.LoginError + response.status);
        }

        const data = await response.json();

        // Assuming backend returns user info directly:
        return data.user as User;
    } catch (error) {
        console.error(ERROR_MESSAGE.LoginError, error);
        throw error;
    }
}

export async function logout(): Promise<void> {
    try {
        await fetch('/api/admin/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(ERROR_MESSAGE.LogoutError, error);
    } finally {

    }
}
