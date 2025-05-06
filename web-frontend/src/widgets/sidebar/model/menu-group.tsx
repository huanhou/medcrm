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
                    children: [
                        { label: staff.children.listOfStaffs, route: '/staff' },
                        { label: staff.children.roles, route: '/roles' },
                        { label: staff.children.permissions, route: '/permissions' },
                        { label: staff.children.departments, route: '/filials' },
                    ],
                },
                {
                    icon: <Staff />,
                    label: specialist.label,
                    route: '/#',
                    children: [
                        { label: specialist.children.listOfSpecialists, route: '/specialist' },
                    ],
                },
                {
                    icon: <Users />,
                    label: patients.label,
                    route: '/#',
                    children: [
                        { label: patients.children.list, route: '/patients' },
                        { label: patients.children.appointments, route: '/appointments' },
                    ],
                },
                {
                    icon: <Wallet />,
                    label: finance.label,
                    route: '/#',
                    children: [
                        { label: finance.children.services, route: '/services' },
                        { label: finance.children.history, route: '/transactions-history' },
                    ],
                },
                {
                    icon: <Cash />,
                    label: expenses.label,
                    route: '/#',
                    children: [
                        { label: expenses.children.listOfExpenses, route: '/expenses' },
                        { label: expenses.children.expenseCategories, route: '/expense-categories' },
                    ],
                },
                {
                    icon: <Folder />,
                    label: reports.label,
                    route: '/#',
                    children: [
                        { label: reports.children.financialReport, route: '/reports/financial-reports' },
                        { label: reports.children.expenseReport, route: '/reports/expenses-reports' },
                        { label: reports.children.visitReport, route: '/reports/visit-reports' },
                        { label: reports.children.annualReport, route: '/reports/annual-reports' },
                    ],
                },
                {
                    icon: <Settings />,
                    label: settings.label,
                    route: '/settings',
                },
            ],
        },
    ];
};
