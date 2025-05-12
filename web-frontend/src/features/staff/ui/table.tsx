'use client';

import { GenericTable } from '@/shared/ui';
import { ROUTES } from '@/shared/constants/routs';
import { useStaffTableColumns } from '../model/columns';
import { useTableLogic } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/entities/staff/types';

export const Table = () => {
    const staticStaffList: Employee[] = [
        {
            id: '030213451',
            fio: 'Азина',
            email: 'example@gmail.com',
            phone: '+77059046703',
            address: 'Сайрам 14',
            filial: 'FK',
            role: 'Стажер',
            status: 'Активный',
        },
        {
            id: '030213452',
            fio: 'Азина',
            email: 'example@gmail.com',
            phone: '+77059046703',
            address: 'Сайрам 14',
            filial: 'FK',
            role: 'Стажер',
            status: 'Не активный',
        },
        {
            id: '030213453',
            fio: 'Азина',
            email: 'example@gmail.com',
            phone: '+77059046703',
            address: 'Сайрам 14',
            filial: 'FK',
            role: 'Стажер',
            status: 'Активный',
        },
        {
            id: '030213454',
            fio: 'Азина',
            email: 'example@gmail.com',
            phone: '+77059046703',
            address: 'Сайрам 14',
            filial: 'FK',
            role: 'Стажер',
            status: 'Не активный',
        },
    ];

    const columns = useStaffTableColumns();
    const tableLogic = useTableLogic(staticStaffList, columns as ColumnDef<Employee>[]);

    const handleDelete = (ids: string[]) => {
        alert(`Удалены: ${ids.join(', ')} (только на клиенте)`);
    };

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={{ mutate: handleDelete }}
            routeCreate={ROUTES.createStaff}
            routeEdit={(id: string) => ROUTES.staffEdit(id)}
            queryKey='staffList'
            entityType='staff'
            defaultAllowCreate
            defaultAllowEdit
            defaultAllowDelete
        />
    );
};
