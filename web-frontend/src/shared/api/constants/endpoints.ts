export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: "/register",
        VERIFY_OTP: "/verify-otp",
        SET_PASSWORD: "/set-password",
        LOGIN: "/login",
        LOGOUT: "/logout",
    },

    STAFF: {
        GET: "/staff",
        GET_BY_ID: (id: string) => `/staff/${id}`,
        CREATE: "/staff",
        EDIT: (id: string) => `/staff/${id}`,
        DELETE: "/staff"
    },

    ROLES: {
        GET: "/roles",
        GET_BY_ID: (id: string) => `/roles/${id}`,
        CREATE: "/roles",
        EDIT: (id: string) => `/roles/${id}`,
        DELETE: "/roles"
    },

    PERMISSIONS: {
        GET: "/permissions",
        GET_BY_ID: (id: string) => `/permissions/${id}`,
        CREATE: "/permissions",
        EDIT: (id: string) => `/permissions/${id}`,
        DELETE: '/permissions',
    },

    FILIALS: {
        GET: "/branches",
        GET_BY_ID: (id: string) => `/branches/${id}`,
        CREATE: "/branches",
        EDIT: (id: string) => `/branches/${id}`,
        DELETE: '/branches'
    },

    SPECIALIST: {
        GET: "/specialists",
        GET_BY_ID: (id: string) => `/specialists/${id}`,
        CREATE: "/specialists",
        EDIT: (id: string) => `/specialists/${id}`,
        DELETE: "/specialists"
    },

    PATIENTS: {
        GET: "/patients",
        GET_BY_ID: (id: string) => `/patients/${id}`,
        CREATE: "/patients",
        EDIT: (id: string) => `/patients/${id}`,
        DELETE: '/patients'
    },

    APPOINTMENTS: {
        GET: "/appointments",
        GET_BY_ID: (id: string) => `/appointments/${id}`,
        CREATE: "/appointments",
        EDIT: (id: string) => `/appointments/${id}`,
        DELETE: '/appointments'
    },

    SERVICES: {
        GET: "/services",
        GET_BY_ID: (id: string) => `/services/${id}`,
        CREATE: "/services",
        EDIT: (id: string) => `/services/${id}`,
        DELETE: '/services'
    },

    EXPENSES_CATEGORIES: {
        GET: "/category_expences",
        GET_BY_ID: (id: string) => `/category_expences/${id}`,
        CREATE: "/category_expences",
        EDIT: (id: string) => `/category_expences/${id}`,
        DELETE: '/category_expences'
    },

    EXPENSES: {
        GET: "/expences",
        GET_BY_ID: (id: string) => `/expences/${id}`,
        CREATE: "/expences",
        EDIT: (id: string) => `/expences/${id}`,
        DELETE: '/expences'
    },

    TRANSACTIONS: {
        BASE: "/transactions",
        CREATE: "/transactions",
        GET_BY_ID: (id: string) => `/transactions/${id}`,
        GET: (type?: string, start_date?: string, end_date?: string) => {
            const queryParams: string[] = [];
            if (type) queryParams.push(`type=${type}`);
            if (start_date) queryParams.push(`start_date=${start_date}`);
            if (end_date) queryParams.push(`end_date=${end_date}`);
            return queryParams.length
                ? `${API_ENDPOINTS.TRANSACTIONS.BASE}?${queryParams.join("&")}`
                : API_ENDPOINTS.TRANSACTIONS.BASE;
        },
    },


    FINANCIAL_REPORT: {
        GET_DAILY: "/cashbox-reports/daily",
        GET_WEEKLY: "/cashbox-reports/weekly",
        GET_MONTHLY: "/cashbox-reports/monthly",
        GET_YEARLY: "/cashbox-reports/yearly",
        GET_RANGE: (start: string, end: string) =>
            `/cashbox-reports-range/${start}/${end}`,
        GET_PERIOD_WITH_QUERY: (period: string, start?: string, end?: string) => {
            const query = [];
            if (start) query.push(`start_date=${start}`);
            if (end) query.push(`end_date=${end}`);
            return `/cashbox-reports/${period}${query.length ? `?${query.join("&")}` : ""}`;
        },
    },

    EXPENSE_REPORT: {
        GET_DAILY: "/expenses_report/daily",
        GET_WEEKLY: "/expenses_report/weekly",
        GET_MONTHLY: "/expenses_report/monthly",
        GET_YEARLY: "/expenses_report/yearly",
        GET_RANGE: (start: string, end: string) => `/expenses_report/${start}/${end}`,
    },

    VISIT_REPORT: {
        GET_DAILY: "/appointments-report/daily",
        GET_WEEKLY: "/appointments-report/weekly",
        GET_MONTHLY: "/appointments-report/monthly",
        GET_YEARLY: "/appointments-report/yearly",
        GET_RANGE: (start: string, end: string) => `/appointments-report/${start}/${end}`,
    },

    SETTINGS: {
        GET: "/organization",
        EDIT: "/organization",
    },
} as const;
