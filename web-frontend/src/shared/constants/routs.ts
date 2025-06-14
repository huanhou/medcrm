export const ROUTES = {
    home: "/ru",
    signIn: "/ru/sign-in",
    signUp: "/ru/sign-up",
    createStaff: "/ru/staff/create",
    staff: "/ru/staff",
    staffEdit: (id: string) => `/ru/staff/${id}`,
    rolesEdit: (id: string) => `/ru/roles/${id}`,
    createRole: "/ru/roles/create",
    roles: "/ru/roles",
    permission: "/ru/permissions",
    createPermission: "/ru/permissions/create",
    editPermission: (id: string) => `/ru/permissions/${id}`,
      patients: "/ru/patients",
    createPatient: "/ru/patients/create",
    editPatient: (id: string) => `/ru/patients/${id}`,
    appointments: "/ru/appointment",
    createAppointment: "/ru/appointments/create",
    editAppointment: (id: string) => `/ru/appointments/${id}`,
    filials: "/ru/filials",
    createFilial: "/ru/filials/create",
    editFilial: (id: string) => `/ru/filials/${id}`,
    expenseCategories: "/ru/expense-categories",
    createExpenseCategory: "/ru/expense-categories/create",
    editExpenseCategory: (id: string) => `/ru/expense-categories/${id}`,
    services: "/ru/services",
    createService: "/ru/services/create",
    editService: (id: string) => `/ru/services/${id}`,
    expenses: "/ru/expenses",
    createExpense: "/ru/expenses/create",
    editExpense: (id: string) => `/ru/expenses/${id}`,
    createSpecialist: "/ru/specialist/create",
    specialists: "/ru/specialist",
    specialistEdit: (id: string) => `/ru/specialist/${id}`,

};
