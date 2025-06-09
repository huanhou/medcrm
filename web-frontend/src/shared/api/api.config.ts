export const API_CONFIG = {
    BASE_URL: "https://medback-hjcwafa0d7c9fsgy.canadacentral-01.azurewebsites.net/api/admin",
} as const;

export const getBaseUrl = (): string => {
    return API_CONFIG.BASE_URL;
};
