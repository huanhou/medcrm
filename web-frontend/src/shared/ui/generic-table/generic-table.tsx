'use client';

import { FC, MouseEvent, useState } from 'react';
import { Button, UISearch, UITable, UiLayout, UiPagination, ReusableModal, Loader, AlertError } from '@/shared/ui';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { ERROR_MESSAGE } from '@/shared/constants/errors';
import { dictionaryMap } from './dictionary-map';
import { usePermissions } from '@/shared/context/permission-context';

type EntityType = keyof ReturnType<typeof dictionaryMap>;

interface GenericTableProps {
    tableLogic: any;
    deleteMutation: any;
    routeCreate: string;
    routeEdit: (id: string) => string;
    queryKey: string;
    modalTitles?: {
        title?: string;
        message?: string;
    };
    entityType: EntityType;
    createPermission?: string;
    editPermission?: string;
    deletePermission?: string;
    defaultAllowEdit?: boolean;
    defaultAllowCreate?: boolean;
    defaultAllowDelete?: boolean;
    totals?: Record<string, string | number>;
}

export const GenericTable: FC<GenericTableProps> = ({
                                                        tableLogic,
                                                        deleteMutation,
                                                        routeCreate,
                                                        routeEdit,
                                                        queryKey,
                                                        modalTitles = {},
                                                        entityType = 'staff',
                                                        createPermission,
                                                        editPermission,
                                                        deletePermission,
                                                        defaultAllowEdit = true,
                                                        defaultAllowCreate = true,
                                                        defaultAllowDelete = true,
                                                    }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const { dictionary } = useDictionary();
    const { hasPermission } = usePermissions();
    const { buttons, modal, successNotifications, errorNotifications } = dictionaryMap(dictionary)[entityType];

    const noPermissionMessage = 'У вас нет необходимых разрешений для выполнения этого действия';

    const canCreate = !createPermission ? defaultAllowCreate : hasPermission(createPermission);
    const canEdit = !editPermission ? defaultAllowEdit : hasPermission(editPermission);
    const canDelete = !deletePermission ? defaultAllowDelete : hasPermission(deletePermission);

    const { isLoading, isError } = tableLogic;

    if (isLoading)
        return (
            <div>
                <Loader />
            </div>
        );
    if (isError)
        return (
            <div>
                <AlertError title={''} message={''} />
            </div>
        );

    const selectedRows = tableLogic.table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row: { original: { id: any } }) => row.original.id);

    const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, id: string) => {
        if ((event.target as HTMLElement).closest('.checkbox')) return;

        if (canEdit) {
            router.push(routeEdit(id));
        } else {
            toast.error(noPermissionMessage);
        }
    };

    const handleOpenModal = () => {
        if (selectedIds.length > 0 && canDelete) {
            setModalOpen(true);
        } else if (selectedIds.length > 0 && !canDelete) {
            toast.error(noPermissionMessage);
        }
    };

    const handleConfirmDelete = () => {
        if (!canDelete) {
            setModalOpen(false);
            return;
        }

        deleteMutation.mutate(selectedIds, {
            onSuccess: () => {
                toast.success(successNotifications.deleteStaff);
                queryClient.invalidateQueries({ queryKey: [queryKey] });
                tableLogic.table.resetRowSelection();
            },
            onError: (error: any) => {
                toast.error(errorNotifications.deleteStaff);
                console.error(ERROR_MESSAGE.unknown, error);
            },
        });
        setModalOpen(false);
    };

    const rowClickHandler = canEdit ? handleRowClick : () => toast.error(noPermissionMessage);

    return (
        <UiLayout>
            <ReusableModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitles.title || modal.titleStaff}
                message={modalTitles.message || modal.messageStaff}
                onConfirm={handleConfirmDelete}
            />
            <div className='flex justify-between items-center px-5'>
                <div className='flex gap-4'>
                    {canCreate && (
                        <Button
                            startIcon={<PlusIcon className='size-6 text-white' />}
                            variant='primary'
                            className='rounded-lg'
                            onClick={() => router.push(routeCreate)}
                        >
                            {buttons.addStaff}
                        </Button>
                    )}

                    {canDelete && (
                        <Button
                            startIcon={<TrashIcon className='size-6 text-gray-6' />}
                            variant='outlined'
                            className='rounded-lg'
                            disabled={selectedIds.length === 0}
                            onClick={handleOpenModal}
                        >
                            {buttons.delete}
                        </Button>
                    )}
                </div>
                <UISearch onSearchChange={tableLogic.setGlobalFilter} />
            </div>
            <UITable table={tableLogic.table} handleRowClick={rowClickHandler} />
            <UiPagination table={tableLogic.table} />
        </UiLayout>
    );
};
