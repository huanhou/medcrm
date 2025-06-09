import { MenuGroupType } from './types';
import { Staff, Users, Folder, Wallet, Cash, Settings } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';

export const useMenuGroups = (): MenuGroupType[] => {
    const { dictionary } = useDictionary();
    const { mainMenu, finance, patients, staff, expenses, reports, settings, specialist } = dictionary.menu;

    return [
        {
            name: mainMenu,
            menuItems: [
                {
                    icon: <Staff />,
                    label: staff.label,
                    route: '/#',
                    permissionRequired: 'READ_STAFF',
                    children: [
                        {
                            label: staff.children.listOfStaffs,
                            route: '/ru/staff',
                            permissionRequired: 'READ_STAFF',
                        },
                        {
                            label: staff.children.roles,
                            route: '/ru/roles',
                            permissionRequired: 'READ_ROLE',
                        },
                        {
                            label: staff.children.permissions,
                            route: '/ru/permissions',
                            permissionRequired: 'READ_PERMISSION',
                        },
                        {
                            label: staff.children.departments,
                            route: '/ru/filials',
                            permissionRequired: 'READ_FILIAL',
                        },
                    ],
                },
                {
                    icon: <Staff />,
                    label: specialist.label,
                    route: '/#',
                    permissionRequired: 'READ_SPECIALIST',
                    children: [
                        {
                            label: specialist.children.listOfSpecialists,
                            route: '/ru/specialist',
                            permissionRequired: 'READ_SPECIALIST',
                        },
                    ],
                },
                {
                    icon: <Users />,
                    label: patients.label,
                    route: '/#',
                    permissionRequired: 'READ_PATIENT',
                    children: [
                        {
                            label: patients.children.list,
                            route: '/ru/patients',
                            permissionRequired: 'READ_PATIENT',
                        },
                        {
                            label: patients.children.appointments,
                            route: '/ru/appointments',
                            permissionRequired: 'READ_APPOINTMENT',
                        },
                    ],
                },
                {
                    icon: <Wallet />,
                    label: finance.label,
                    route: '/#',
                    permissionRequired: 'READ_SERVICE',
                    children: [
                        {
                            label: finance.children.services,
                            route: '/ru/services',
                            permissionRequired: 'READ_SERVICE',
                        },
                        {
                            label: finance.children.history,
                            route: '/ru/transactions-history',
                            permissionRequired: 'READ_TRANSACTION',
                        },
                    ],
                },
                {
                    icon: <Cash />,
                    label: expenses.label,
                    route: '/#',
                    permissionRequired: 'READ_EXPENSE',
                    children: [
                        {
                            label: expenses.children.listOfExpenses,
                            route: '/ru/expenses',
                            permissionRequired: 'READ_EXPENSE',
                        },
                        {
                            label: expenses.children.expenseCategories,
                            route: '/ru/expense-categories',
                            permissionRequired: 'READ_EXPENSE_CATEGORY',
                        },
                    ],
                },
                {
                    icon: <Folder />,
                    label: reports.label,
                    route: '/#',
                    permissionRequired: 'READ_REPORT',
                    children: [
                        {
                            label: reports.children.financialReport,
                            route: '/ru/reports/financial-reports',
                            permissionRequired: 'READ_REPORT',
                        },
                        {
                            label: reports.children.expenseReport,
                            route: '/ru/reports/expenses-reports',
                            permissionRequired: 'READ_REPORT',
                        },
                        {
                            label: reports.children.visitReport,
                            route: '/ru/reports/visit-reports',
                            permissionRequired: 'READ_REPORT',
                        },
                    ],
                },
                {
                    icon: <Settings />,
                    label: settings.label,
                    route: '/ru/settings',
                    permissionRequired: 'READ_SETTINGS',
                },
            ],
        },
    ];
};
