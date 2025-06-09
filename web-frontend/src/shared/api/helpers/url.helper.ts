import { API_CONFIG } from "../api.config";
export const buildUrl = (endpoint: string, isAuth = false): string => {
    const baseUrl = isAuth ? API_CONFIG.AUTH_BASE_URL : API_CONFIG.ADMIN_BASE_URL;
    return `${baseUrl}${endpoint}`;
};
