export interface GetSessionInfoDto {
    id: string;
    phone_number: string;
    iat: number;
    exp: number;
}

export interface StaffSignInBodyDto {
    phone_number: string;
    password: string;
}

export interface StaffSignUpBodyDto {
    fio: string;
    phone_number: string;
    email: string;
    password: string;
}

export interface Filial {
    id: string;
    name: string;
    address: string | null;
    phone: string;
    email: string;
    status: string;
    deleted_at: string | null;
}

export interface Role {
    id: string;
    name: string;
    created_at: string;
    deleted_at: string | null;
    _count?: {
        Staff: number;
    };
    Permissions?: Array<{
        id: string;
        name: string;
        description: string;
        code: string;
        created_at: string;
        deleted_at: string | null;
    }>;
}

export interface BackendStaff {
    id: string;
    fio: string;
    iin: string;
    email: string;
    role_id: string;
    password: string;
    phone_number: string;
    address: string | null;
    filial_id: string;
    draft_description: boolean;
    status: string;
    created_at: string;
    deleted_at: string | null;
    Role: Role;
    Filial: Filial;
}

export type GetStaffResponse = BackendStaff[];

export interface Role {
    id: string;
    name: string;
    deleted_at: string | null;
}

export interface Filial {
    id: string;
    name: string;
    address: string | null;
    phone: string;
    email: string;
    status: string;
    deleted_at: string | null;
}

export interface CreateFilialDto {
    name: string;
    address: string;
    phone: string;
    email: string;
    status: "active" | "inactive";
}

export interface EditFilialDto {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    status?: "active" | "inactive";
}

export interface CreateStaffDto {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    branch: string;  // Changed from filial_id to branch (name)
    role: string;    // Changed from role_id to role (name)
}


export interface CreateStaffResponse {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    branch: string;
    status: "active" | "inactive";
    role: string;
    created_at: string;
    updated_at: string;
}
export interface EditStaffDto extends CreateStaffDto {
    id: string;
}

export type GetRolesResponse = Role[];
export type GetFilialsResponse = Filial[];

export interface DeleteStaffPayload {
    ids: string[];
}

export interface Permission {
    id: string;
    name: string;
    description: string;
    code: string;
}

export type GetPermissionsResponse = Permission[];

export interface CreatePermissionDto {
    name: string;
    description: string;
}

export interface createPermissionResponse {
    id: string;
    name: string;
}

export interface CreateRoleDto {
    roleName: string;
    permission: string[];
}

export interface EditRoleDto {
    id: string;
    name: string;
    permissions: number[];
}

export interface CreatePermissionDto {
    name: string;
    description: string;
    code: string;
}

export interface Patient {
    id: string;
    fio: string;
    phone: string;
    address: string;
    filial_id: string;
    iin: string;
    created_at: string;
    deleted_at: string | null;
    Filial: Filial;
    description?:string
}

export type GetPatientsResponse = Patient[];

export interface CreatePatientDto {
    fio: string;
    phone: string;
    iin: string;
    // address: string;
    filial_id: string;
}

export interface CreatePatientResponse {
    id: string;
    fio: string;
    phone: string;
    iin: string;
    address: string;
    filial_id: string;
    created_at: string;
    deleted_at: null;
}


export interface Appointment {
    id: string;
    patient_id: string;
    specialist_id: string;
    date_time: string;
    status: string;
    created_at: string;
    deleted_at: string | null;
    comment: string;
    Patient: {
        id: string;
        fio: string;
        phone: string;
        address: string;
        filial_id: string;
        iin: string;
        created_at: string;
        deleted_at: string | null;
    };
    Specialist: {
        id: string;
        fio: string;
        phone_number: string;
        email: string;
        iin: string;
        status: "active" | "inactive" | string;
        Internal: boolean;
        filial_id: string;
        Filial: Filial;
    };
    Transactions: any[];
}

export type GetAppointmentsResponse = Appointment[];

export interface CreateAppointmentDto {
    patient_id: string;
    specialist_id: string;
    date_time: string;
    comment: string;
    service_ids: string[];
    status: string;
}

export interface Service {
    id: string;
    name: string;
    price: number;
    description: string;
    is_active: boolean;
    created_at: string;
    deleted_at: string | null;
}

export type GetServicesResponse = Service[];

export interface CreateServiceDto {
    name: string;
    description: string;
    is_active: boolean;
}

export interface EditServiceDto {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export interface ExpenseCategory {
    id: string;
    name: string;
    description: string;
    created_at: string;
    deleted_at: string | null;
}

export type GetExpenseCategoriesResponse = ExpenseCategory[];

export interface CreateExpenseCategoryDto {
    name: string;
    description: string;
}

export interface Expense {
    id: string;
    category_id: string;
    amount: number;
    currency: string;
    description: string;
    created_at: string;
    deleted_at: string | null;
    ExpenseCategory: ExpenseCategory;
    Staff: {
        id: string;
        fio: string;
        iin: string;
        email: string | null;
        role_id: string;
        password: string;
        phone_number: string;
        address: string;
        filial_id: string;
        draft_description: boolean;
        status: string;
        created_at: string;
        deleted_at: string | null;
    };
}

export type GetExpensesResponse = Expense[];

export interface CreateExpenseDto {
    category_id: string;
    amount: number | string;
    description: string;
    currency?: string;
    staff_id?: string;
}

export interface Transaction {
    id: string;
    appointment_id: string | null;
    patient_id: string;
    amount: number;
    status: "pending" | "completed" | "cancelled";
    payment_method: "CASH" | "CARD";
    created_at: string;
    deleted_at: string | null;
    TransactionServices: {
        transaction_id: string;
        service_id: string;
        Service: Service;
    }[];
    Patient: Patient;
}

export type GetTransactionsResponse = Transaction[];

export interface CreateBoxOfficeDto {
    patient_id: string;
    comment?: string;
    amount: number;
    payment_method: "cash" | "card" | "transfer";
    service_ids: string[];
}

export interface FinancialReport {
    id: string;
    totalRevenue: number;
    totalTransactions: number;
    status: "completed";
    started_at: string;
    ended_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export type GetFinancialReportResponse = FinancialReport[];

export type GetExportFinancialReportResponse = {
    fileUrl: string;
};

export interface ExpenseReport {
    id: string;
    totalExpenses: number;
    categoriesSummary: Record<string, number>;
    status: "completed";
    created_at: string;
    updated_at: string;
    started_at: string | null;
    ended_at: string | null;
    deleted_at: string | null;
}

export type GetExpenseReportsResponse = ExpenseReport[];

export interface AnnualReport {
    id: string;
    year: number;
    totalRevenue: number;
    totalExpenses: number;
    profit: number;
    topServices: Record<string, number>[];
    topDoctors: Record<string, number>[];
    status: "completed";
    created_at: string;
    updated_at: string;
    started_at: string;
    ended_at: string;
    deleted_at: string | null;
}

export type GetAnnualReportsResponse = AnnualReport[];

export interface VisitReport {
    id: string;
    totalVisits: number;
    visitsByDoctor: Record<string, number>;
    visitsByService: Record<string, number>;
    status: "completed";
    created_at: string;
    updated_at: string;
    started_at: string | null;
    ended_at: string | null;
    deleted_at: string | null;
}

export type GetVisitReportsResponse = VisitReport[];

export interface BackendSpecialist {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    iin: string;
    status: "active" | "inactive" | string;
    specialistType: 'Внешний' |'Внутренний';
    branch: string;
}

export type GetSpecialistsResponse = BackendSpecialist[];

export interface CreateSpecialistDto {
    name: string;
    phoneNumber: string;
    iin: string;
    specialistType: boolean;
    branch: string;
}

export interface EditSpecialistDto extends CreateSpecialistDto {
    id: string;
}

export interface CreateSpecialistResponse {
    id: string;
    fio: string;
    phone_number: string;
    iin: string;
    status: "active" | "inactive" | "blocked";
    internal: boolean;
    created_at: string;
    updated_at: string;
}

export interface Settings {
    organization_name: string;
    iin_bin: string;
    legal_address: string;
    director: string;
    bio: string;
    phone: string;
    logo: string;
}

export interface UpdateSettingRequest {
    key: string;
    value: string;
}

export type GetSettingsResponse = Settings;

export type PeriodType = "daily" | "weekly" | "monthly" | "yearly";