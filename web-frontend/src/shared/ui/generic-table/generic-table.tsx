'use client';

import { FC, MouseEvent, useState } from 'react';
import {
    Button,
    UISearch,
    UITable,
    UiLayout,
    UiPagination,
    ReusableModal,
    Loader,
    AlertError,
} from '@/shared/ui';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { ERROR_MESSAGE } from '@/shared/constants/errors';
import { dictionaryMap } from './dictionary-map';

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
                                                        defaultAllowEdit = true,
                                                        defaultAllowCreate = true,
                                                        defaultAllowDelete = true,
                                                    }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const { dictionary } = useDictionary();
    const { buttons, modal, successNotifications, errorNotifications } = dictionaryMap(dictionary)[entityType];

    const canCreate = defaultAllowCreate;
    const canEdit = defaultAllowEdit;
    const canDelete = defaultAllowDelete;

    const { isLoading, isError } = tableLogic;

    if (isLoading) return <Loader />;
    if (isError) return <AlertError title='' message='' />;

    const selectedRows = tableLogic.table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row: { original: { id: string } }) => row.original.id);

    const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, id: string) => {
        if ((event.target as HTMLElement).closest('.checkbox')) return;
        if (canEdit) {
            router.push(routeEdit(id));
        }
    };

    const handleOpenModal = () => {
        if (selectedIds.length > 0 && canDelete) {
            setModalOpen(true);
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
            <UITable table={tableLogic.table} handleRowClick={handleRowClick} />
            <UiPagination table={tableLogic.table} />
        </UiLayout>
    );
};
