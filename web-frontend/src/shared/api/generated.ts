import { apiInstance, createInstance } from "./api-instance";
import type { BodyType } from "./api-instance";
import { API_ENDPOINTS } from "@/shared/api/constants/endpoints";
import {
    StaffSignUpBodyDto,
    CreateStaffResponse,
    DeleteStaffPayload,
    CreateStaffDto,
    GetStaffResponse,
    GetFilialsResponse,
    GetRolesResponse,
    GetPermissionsResponse,
    StaffSignInBodyDto,
    GetSessionInfoDto,
    CreateRoleDto,
    CreatePermissionDto,
    GetPatientsResponse,
    CreatePatientDto,
    CreatePatientResponse,
    Patient,
    Permission,
    BackendStaff,
    GetAppointmentsResponse,
    CreateAppointmentDto,
    Appointment,
    Role,
    Filial,
    CreateFilialDto,
    GetServicesResponse,
    Service,
    CreateServiceDto,
    GetExpenseCategoriesResponse,
    ExpenseCategory,
    CreateExpenseCategoryDto,
    EditFilialDto,
    EditServiceDto,
    GetExpensesResponse,
    CreateExpenseDto,
    Expense,
    GetTransactionsResponse,
    CreateBoxOfficeDto,
    GetFinancialReportResponse,
    GetExportFinancialReportResponse,
    GetExpenseReportsResponse,
    GetAnnualReportsResponse,
    GetSettingsResponse,
    Settings,
    BackendSpecialist,
    GetSpecialistsResponse,
    CreateSpecialistDto,
    CreateSpecialistResponse,
} from "./types";
import { ERROR_MESSAGE } from "../constants/errors";

// ==== AUTH ====

export const authControllerStaffSignUp = async (
    signUpBodyDto: StaffSignUpBodyDto
) => {
    return createInstance({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: signUpBodyDto,
    });
};
export const authControllerStaffSignIn = async (signInBodyDto: StaffSignInBodyDto) => {
    const { phone_number, ...rest } = signInBodyDto;
    return createInstance({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
            phoneNumber: phone_number,
            ...rest,
        },
    });
};

export const authControllerSignOut = () => {
    return createInstance<void>({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "post",
    });
};
export const registerUser = (data: { full_name: string; email: string; phone: string }) => {
    return createInstance({
        url: "/register",
        method: "post",
        data,
    });
};
export const verifyOtp = (data: { email: string; otp: string }) => {
    return createInstance({
        url: API_ENDPOINTS.AUTH.VERIFY_OTP,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data,
    });
};

export const authControllerGetSessionInfo = () => {
    return createInstance<GetSessionInfoDto>({
        url: "/auth/staff/session",
        method: "get",
    });
};

// ==== FILIALS ====

export const getFilials = () => {
    return createInstance<GetFilialsResponse>({
        url: API_ENDPOINTS.FILIALS.GET,
        method: "get",
    });
};

export const getFilialById = (id: string) => {
    return createInstance<Filial>({
        url: API_ENDPOINTS.FILIALS.GET_BY_ID(id),
        method: "get",
    });
};

export const createFilial = (data: CreateFilialDto) => {
    return createInstance<Filial>({
        url: API_ENDPOINTS.FILIALS.CREATE,
        method: "post",
        data,
    });
};

export const editFilial = (id: string, data: EditFilialDto) => {
    return createInstance<Filial>({
        url: API_ENDPOINTS.FILIALS.EDIT(id),
        method: "put",
        data,
    });
};
export const deleteFilial = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.FILIALS.DELETE,  // Endpoint to delete filials (no ID in URL)
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};


// ==== ROLES ====

export const getRoles = () => {
    return createInstance<GetRolesResponse>({
        url: API_ENDPOINTS.ROLES.GET,
        method: "get",
    });
};

export const getRoleById = (id: string) => {
    return createInstance<Role>({
        url: API_ENDPOINTS.ROLES.GET_BY_ID(id),
        method: "get",
    });
};

export const createRole = (data: CreateRoleDto) => {
    return createInstance({
        url: API_ENDPOINTS.ROLES.CREATE,
        method: "post",
        data,
    });
};

export const editRole = (id: string, data: CreateRoleDto) => {
    return createInstance({
        url: API_ENDPOINTS.ROLES.EDIT(id),
        method: "put",
        data,
    });
};

// Updated deleteRole function to handle multiple IDs
export const deleteRole = (ids: number[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.ROLES.DELETE,  // Endpoint to delete roles
        method: "delete",
        data: { ids },  // Send the ids as an array
    });
};


// ==== STAFF ====

export const getListOfStaff = () => {
    return createInstance<GetStaffResponse>({
        url: API_ENDPOINTS.STAFF.GET,
        method: "get",
    });
};

export const getStaffById = (id: string) => {
    return createInstance<BackendStaff>({
        url: API_ENDPOINTS.STAFF.GET_BY_ID(id),
        method: "get",
    });
};


export const createStaff = (data: CreateStaffDto) => {
    return createInstance<CreateStaffResponse>({
        url: API_ENDPOINTS.STAFF.CREATE,
        method: "post",
        data,  // Passing the names for branch and role
    });
};

export const editStaff = (id: string, data: CreateStaffDto) => {
    return createInstance<CreateStaffResponse>({
        url: API_ENDPOINTS.STAFF.EDIT(id),
        method: "put",
        data,  // Passing the names for branch and role
    });
};

export const deleteStaff = (ids: number[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.STAFF.DELETE,
        method: 'delete',
        data: {
            ids,  // Ensure this is an array of integers
        },
    });
};


// ==== PERMISSIONS ====

export const getPermissions = () => {
    return createInstance<GetPermissionsResponse>({
        url: API_ENDPOINTS.PERMISSIONS.GET,
        method: "get",
    });
};

export const getPermissionById = (id: string) => {
    return createInstance<Permission>({
        url: API_ENDPOINTS.PERMISSIONS.GET_BY_ID(id),
        method: "get",
    });
};

export const createPermission = (data: CreatePermissionDto) => {
    return createInstance({
        url: API_ENDPOINTS.PERMISSIONS.CREATE,
        method: "post",
        data,
    });
};

export const editPermission = (id: string, data: CreatePermissionDto) => {
    return createInstance({
        url: API_ENDPOINTS.PERMISSIONS.EDIT(id),
        method: "put",
        data,
    });
};

export const deletePermission = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.PERMISSIONS.DELETE,  // The endpoint for deleting permissions (no single ID in URL)
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};

// ==== PATIENTS ====

export const getPatients = () => {
    return createInstance<GetPatientsResponse>({
        url: API_ENDPOINTS.PATIENTS.GET,
        method: "get",
    });
};

export const getPatientById = (id: string) => {
    return createInstance<Patient>({
        url: API_ENDPOINTS.PATIENTS.GET_BY_ID(id),
        method: "get",
    });
};

export const createPatient = (data: CreatePatientDto) => {
    return createInstance<CreatePatientResponse>({
        url: API_ENDPOINTS.PATIENTS.CREATE,
        method: "post",
        data,
    });
};

export const editPatient = (id: string, data: CreatePatientDto) => {
    return createInstance<CreatePatientResponse>({
        url: API_ENDPOINTS.PATIENTS.EDIT(id),
        method: "put",
        data,
    });
};
export const deletePatient = (fullNames: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.PATIENTS.DELETE,  // Use the correct endpoint for patient deletion
        method: 'delete',
        data: { fullNames },  // Send the array of patient names for deletion
    });
};

// ==== ACTIVATION ====


export const setPassword = (email: string, otp: string, password: string) => {
    return createInstance<{ success: boolean; message: string }>({
        url: API_ENDPOINTS.AUTH.SET_PASSWORD,
        method: "post",
        data: { email, otp, password },
    });
};


// ==== APPOINTMENTS ====

export const getAppointments = () => {
    return createInstance<GetAppointmentsResponse>({
        url: API_ENDPOINTS.APPOINTMENTS.GET,
        method: "get",
    });
};

export const getAppointmentById = (id: string) => {
    return createInstance<Appointment>({
        url: API_ENDPOINTS.APPOINTMENTS.GET_BY_ID(id),
        method: "get",
    });
};

export const createAppointment = (data: CreateAppointmentDto) => {
    return createInstance<Appointment>({
        url: API_ENDPOINTS.APPOINTMENTS.CREATE,
        method: "post",
        data,
    });
};

export const editAppointment = (id: string, data: CreateAppointmentDto) => {
    return createInstance<Appointment>({
        url: API_ENDPOINTS.APPOINTMENTS.EDIT(id),
        method: "put",
        data,
    });
};

export const deleteAppointment = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.APPOINTMENTS.DELETE,  // Use the DELETE endpoint without the individual ID in the URL
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};


// ==== SERVICES ====

export const getServices = () => {
    return createInstance<GetServicesResponse>({
        url: API_ENDPOINTS.SERVICES.GET,
        method: "get",
    });
};

export const getServiceById = (id: string) => {
    return createInstance<Service>({
        url: API_ENDPOINTS.SERVICES.GET_BY_ID(id),
        method: "get",
    });
};

export const createService = (data: CreateServiceDto) => {
    return createInstance<Service>({
        url: API_ENDPOINTS.SERVICES.CREATE,
        method: "post",
        data,
    });
};

export const editService = (id: string, data: EditServiceDto) => {
    return createInstance<Service>({
        url: API_ENDPOINTS.SERVICES.EDIT(id),
        method: "put",
        data,
    });
};
export const deleteService = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.SERVICES.DELETE,  // Use the DELETE endpoint without the individual ID in the URL
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};


// ==== EXPENSE CATEGORIES ====

export const getExpenseCategories = () => {
    return createInstance<GetExpenseCategoriesResponse>({
        url: API_ENDPOINTS.EXPENSES_CATEGORIES.GET,
        method: "get",
    });
};

export const getExpenseCategoryById = (id: string) => {
    return createInstance<ExpenseCategory>({
        url: API_ENDPOINTS.EXPENSES_CATEGORIES.GET_BY_ID(id),
        method: "get",
    });
};

export const createExpenseCategory = (data: CreateExpenseCategoryDto) => {
    return createInstance<ExpenseCategory>({
        url: API_ENDPOINTS.EXPENSES_CATEGORIES.CREATE,
        method: "post",
        data,
    });
};

export const editExpenseCategory = (
    id: string,
    data: CreateExpenseCategoryDto
) => {
    return createInstance<ExpenseCategory>({
        url: API_ENDPOINTS.EXPENSES_CATEGORIES.EDIT(id),
        method: "put",
        data,
    });
};

export const deleteExpenseCategory = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.EXPENSES_CATEGORIES.DELETE,  // Use the DELETE endpoint for deleting multiple expense categories
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};

// ==== EXPENSES ====

export const getExpenses = () => {
    return createInstance<GetExpensesResponse>({
        url: API_ENDPOINTS.EXPENSES.GET,
        method: "get",
    });
};

export const getExpenseById = (id: string) => {
    return createInstance<Expense>({
        url: API_ENDPOINTS.EXPENSES.GET_BY_ID(id),
        method: "get",
    });
};

export const createExpense = (data: CreateExpenseDto) => {
    return createInstance<Expense>({
        url: API_ENDPOINTS.EXPENSES.CREATE,
        method: "post",
        data,
    });
};

export const editExpense = (id: string, data: CreateExpenseDto) => {
    return createInstance<Expense>({
        url: API_ENDPOINTS.EXPENSES.EDIT(id),
        method: "put",
        data,
    });
};

export const deleteExpense = (ids: string[]) => {
    return createInstance<void>({
        url: API_ENDPOINTS.EXPENSES.DELETE,  // Use the DELETE endpoint without the individual ID in the URL
        method: "delete",
        data: { ids },  // Send the array of IDs in the request body
    });
};


// ==== TRANSACTIONS ====
export const getTransactions = (
    type?: string,
    start_date?: Date,
    end_date?: Date
) => {
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const startStr = start_date ? formatDate(start_date) : undefined;
    const endStr = end_date ? formatDate(end_date) : undefined;

    const url = API_ENDPOINTS.TRANSACTIONS.GET(type, startStr, endStr);

    return createInstance<GetTransactionsResponse>({
        url,
        method: "get",
    });
};



// export const createBoxOffice = (data: CreateBoxOfficeDto) => {
//     return createInstance({
//         url: API_ENDPOINTS.BOX_OFFICE.CREATE,
//         method: "post",
//         data,
//     });
// };

// ==== REPORTS (FINANCIAL, EXPENSE, ANNUAL, VISIT) ====
// These remain unchanged if endpoints are the same (adjust if needed)

export const getFinancialReport = (
    period: "daily" | "weekly" | "monthly" | "yearly"
) => {
    const endpoints = {
        daily: API_ENDPOINTS.FINANCIAL_REPORT.GET_DAILY,
        weekly: API_ENDPOINTS.FINANCIAL_REPORT.GET_WEEKLY,
        monthly: API_ENDPOINTS.FINANCIAL_REPORT.GET_MONTHLY,
        yearly: API_ENDPOINTS.FINANCIAL_REPORT.GET_YEARLY,
    };

    return createInstance<GetFinancialReportResponse>({
        url: endpoints[period],
        method: "get",
    });
};

// export const exportFinancialReport = (
//     period: "day" | "week" | "month" | "year"
// ) => {
//     return createInstance<GetExportFinancialReportResponse>({
//         url: API_ENDPOINTS.FINANCIAL_REPORT.EXPORT_PDF(period),
//         method: "get",
//     });
// };

export const getExpenseReport = (
    period: "daily" | "weekly" | "monthly" | "yearly"
) => {
    const endpoints = {
        daily: API_ENDPOINTS.EXPENSE_REPORT.GET_DAILY,
        weekly: API_ENDPOINTS.EXPENSE_REPORT.GET_WEEKLY,
        monthly: API_ENDPOINTS.EXPENSE_REPORT.GET_MONTHLY,
        yearly: API_ENDPOINTS.EXPENSE_REPORT.GET_YEARLY,
    };

    return createInstance<GetExpenseReportsResponse>({
        url: endpoints[period],
        method: "get",
    });
};

export const getVisitReport = (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    const endpoints = {
        daily: API_ENDPOINTS.VISIT_REPORT.GET_DAILY,
        weekly: API_ENDPOINTS.VISIT_REPORT.GET_WEEKLY,
        monthly: API_ENDPOINTS.VISIT_REPORT.GET_MONTHLY,
        yearly: API_ENDPOINTS.VISIT_REPORT.GET_YEARLY,
    };
    return createInstance<any>({
        url: endpoints[period],
        method: "get",
    });
};

export const getVisitReportByDate = async (start_date?: Date, end_date?: Date) => {
    if (!start_date || !end_date) {
        throw new Error("start_date and end_date are required");
    }

    const url = API_ENDPOINTS.VISIT_REPORT.GET_RANGE(
        start_date.toISOString(),
        end_date.toISOString()
    );

    const response = await apiInstance({ url, method: "get" });
    return response.data;
};


export const getExpenseReportByDate = (start_date?: Date, end_date?: Date) => {
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const startStr = start_date ? formatDate(start_date) : undefined;
    const endStr = end_date
        ? formatDate(end_date)
        : start_date
            ? formatDate(start_date)
            : formatDate(new Date());
    if (!startStr || !endStr) {
        throw new Error("start_date and end_date are required for custom range");
    }
    const url = API_ENDPOINTS.EXPENSE_REPORT.GET_RANGE(startStr, endStr);

    return createInstance<GetExpenseReportsResponse>({
        url,
        method: "get",
    });
};

export const getFinancialReportByDate = (
    start_date?: Date,
    end_date?: Date
) => {
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const startStr = start_date ? formatDate(start_date) : undefined;
    const endStr = end_date
        ? formatDate(end_date)
        : start_date
            ? formatDate(start_date)
            : formatDate(new Date());
    if (!startStr || !endStr) {
        throw new Error("start_date and end_date are required for custom range");
    }
    const url = API_ENDPOINTS.FINANCIAL_REPORT.GET_RANGE(startStr, endStr);

    return createInstance<GetFinancialReportResponse>({
        url,
        method: "get",
    });
};

// ==== SETTINGS ====

export const getSettings = () => {
    return createInstance<GetSettingsResponse>({
        url: API_ENDPOINTS.SETTINGS.GET,
        method: "get",
    });
}
type SettingsWithLogo = Omit<Settings, "logo"> & {
    logo?: string;
};

export const editSettings = (data: SettingsWithLogo) => {
    return createInstance<GetSettingsResponse>({
        url: API_ENDPOINTS.SETTINGS.EDIT,
        method: "put",
        data,
    });
};





// ==== DOCTORS ====

export const getDoctors = () => {
    return createInstance<GetStaffResponse>({
        url: API_ENDPOINTS.SPECIALIST.GET,
        method: "get",
    });
};

// ==== SPECIALISTS ====

export const getSpecialists = () => {
    return createInstance<GetSpecialistsResponse>({
        url: API_ENDPOINTS.SPECIALIST.GET,
        method: "get",
    });
};

export const getSpecialistById = (id: string) => {
    return createInstance<BackendSpecialist>({
        url: API_ENDPOINTS.SPECIALIST.GET_BY_ID(id),
        method: "get",
    });
};

export const editSpecialist = (id: string, data: CreateSpecialistDto) => {
    return createInstance<CreateSpecialistResponse>({
        url: API_ENDPOINTS.SPECIALIST.EDIT(id),
        method: "put",
        data,
    });
};

export const createSpecialist = (data: CreateSpecialistDto) => {
    return createInstance<CreateSpecialistResponse>({
        url: API_ENDPOINTS.SPECIALIST.CREATE,
        method: "post",
        data,
    });
};

export const deleteSpecialist = (id: string) => {
    return createInstance<void>({
        url: API_ENDPOINTS.SPECIALIST.DELETE + `/${id}`,
        method: "delete",
    });
};

// === Types ===

export type AuthControllerSignUpResult = NonNullable<
    Awaited<ReturnType<typeof authControllerStaffSignUp>>
>;
export type AuthControllerSignInResult = NonNullable<
    Awaited<ReturnType<typeof authControllerStaffSignIn>>
>;
export type AuthControllerGetSessionInfoResult = NonNullable<
    Awaited<ReturnType<typeof authControllerGetSessionInfo>>
>;
