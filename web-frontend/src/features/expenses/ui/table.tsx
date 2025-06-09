// 'use client';



// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { GenericTable } from '@/shared/ui';
// import { useMemo } from 'react';

// export const Table = () => {
//   //   const { tableLogic } = useExpenseTable();
//   // const deleteExpenseMutation = useDeleteExpenseMutation();
//   // const visibleRows = tableLogic.table.getRowModel().rows;
//   // const pageTotal = useMemo(() => {
//   //   return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
//   // }, [visibleRows]);

//   // <GenericTable
//   //   tableLogic={tableLogic}
//   //   deleteMutation={deleteExpenseMutation}
//   //   routeCreate={ROUTES.createExpense}
//   //   routeEdit={ROUTES.editExpense}
//   //   queryKey='expenses'
//   //   entityType='expenses'
//   //   totals={{ amount: pageTotal }}
//   // />
//   const { tableLogic } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();

//   //Pagetotal
//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows
//       .reduce((sum, row) => sum + Number(row.original.amount), 0)
//   }, [visibleRows]);

//   console.log(pageTotal);
//   return (
//     <GenericTable
//       tableLogic={tableLogic}
//       deleteMutation={deleteExpenseMutation}
//       routeCreate={ROUTES.createExpense}
//       routeEdit={ROUTES.editExpense}
//       queryKey='expenses'
//       entityType='expenses'
//       totals={{ amount: pageTotal }}
//     />
//   );

// };
// В ui/table.tsx
// 'use client';

// import { useMemo, useState } from 'react';
// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { UiLayout, UiPagination, UISearch, UITable } from '@/shared/ui';
// import { useGetExpenseCategoriesQuery } from '@/shared/api/expense-category';

// type TabType = string | null; // ID категории или null для всех

// export const Table = () => {
//   const [activeTab, setActiveTab] = useState<TabType>(null);

//   const { data: categories } = useGetExpenseCategoriesQuery();
//   const { tableLogic, setCategoryId } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();

//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
//   }, [visibleRows]);

//   const handleTabClick = (categoryId: TabType) => {
//     setActiveTab(categoryId);
//     setCategoryId(categoryId);
//   };

//   const handleRowClick = (row: any) => {
//     window.location.href = `${ROUTES.editExpense}/${row.original.id}`;
//   };

//   const tabs = [
//     { title: 'Все', type: null as TabType },
//     ...(categories?.map((category) => ({
//       title: category.name,
//       type: category.id as TabType,
//     })) || []),
//   ];

//   return (
//     <UiLayout>
//       <div className="flex flex-col px-5">
//         <div className="flex items-end border-b border-stroke dark:border-dark-3">
//           {tabs.map((tab, index) => (
//             <div
//               key={index}
//               className="mr-8 cursor-pointer"
//               onClick={() => handleTabClick(tab.type)}
//             >
//               <div
//                 className={`py-4 font-medium ${
//                   activeTab === tab.type ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
//                 }`}
//               >
//                 {tab.title}
//               </div>
//             </div>
//           ))}
//           <div className="flex items-center justify-end gap-4 w-full">
//             <UISearch onSearchChange={tableLogic.setGlobalFilter} />
//           </div>
//         </div>
//       </div>
//       <UITable
//         table={tableLogic.table}
//         handleRowClick={handleRowClick}
//         isIdColumn={false}
//         totals={{ amount: pageTotal }}
//       />
//       <UiPagination table={tableLogic.table} />
//     </UiLayout>
//   );
// };


// В ui/table.tsx
// 'use client';

// import { useMemo } from 'react';
// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { UiLayout, UiPagination, UISearch, UITable } from '@/shared/ui';

// export const Table = () => {
//   const { tableLogic } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();

//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
//   }, [visibleRows]);

//   const handleRowClick = (row: any) => {
//     window.location.href = `${ROUTES.editExpense}/${row.original.id}`;
//   };

//   return (
//     <UiLayout>
//       <div className="flex flex-col px-5">
//         <div className="flex items-end border-b border-stroke dark:border-dark-3">
//           <div className="flex items-center justify-end gap-4 w-full">
//             <UISearch onSearchChange={tableLogic.setGlobalFilter} />
//           </div>
//         </div>
//       </div>
//       <UITable
//         table={tableLogic.table}
//         handleRowClick={handleRowClick}
//         isIdColumn={false}
//         totals={{ amount: pageTotal }}
//       />
//       <UiPagination table={tableLogic.table} />
//     </UiLayout>
//   );
// };

// В ui/table.tsx
// 'use client';

// import { useMemo } from 'react';
// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { UiLayout, UiPagination, UISearch, UITable, Button } from '@/shared/ui';
// import { useRouter } from 'next/navigation';

// export const Table = () => {
//   const { tableLogic } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();
//   const router = useRouter();

//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
//   }, [visibleRows]);

//   const handleRowClick = (row: any) => {
//     router.push(`${ROUTES.editExpense}/${row.original.id}`);
//   };

//   const handleCreateExpense = () => {
//     router.push(ROUTES.createExpense);
//   };

//   return (
//     <UiLayout>
//       <div className="flex flex-col px-5">
//         <div className="flex items-end border-b border-stroke dark:border-dark-3">
//           <div className="flex items-center justify-between gap-4 w-full">
//             <UISearch onSearchChange={tableLogic.setGlobalFilter} />
//             <Button
//                 onClick={handleDeleteExpenses}
//                 variant="danger"
//                 className="rounded-[7px]"
//                 disabled={!tableLogic.table.getSelectedRowModel().rows.length}
//               >
//                 {buttons.delete}
//             </Button>
//             <Button
//               onClick={handleCreateExpense}
//               variant="primary"
//               className="rounded-[7px]"
//             >
//               Добавить расходы
//             </Button>
//           </div>
//         </div>
//       </div>
//       <UITable
//         table={tableLogic.table}
//         handleRowClick={handleRowClick}
//         isIdColumn={false}
//         totals={{ amount: pageTotal }}
//       />
//       <UiPagination table={tableLogic.table} />
//     </UiLayout>
//   );
// };





// В expenses/ui/table.tsx
// В expenses/ui/table.tsx
'use client';

import { useMemo } from 'react';
import { ROUTES } from '@/shared/constants/routs';
import { useExpenseTable } from '../model/use-expenses-table';
import { useDeleteExpenseMutation } from '../model/expenses-api';
import { GenericTable, UiLayout } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';

export const Table = () => {
    const { tableLogic } = useExpenseTable();
    const deleteExpenseMutation = useDeleteExpenseMutation();
    const { dictionary } = useDictionary();

    const visibleRows = tableLogic.table.getRowModel().rows;
    const pageTotal = useMemo(() => {
        return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
    }, [visibleRows]);

    // Резервный текст, если labels.total отсутствует
    // const totalLabel = dictionary?.labels?.total || 'Итого';

    return (
        <UiLayout>
            <GenericTable
                tableLogic={tableLogic}
                deleteMutation={deleteExpenseMutation}
                routeCreate={ROUTES.createExpense}
                routeEdit={(id: string) => `${ROUTES.editExpense}/${id}`}
                queryKey="expenses"
                entityType="expenses"
                createPermission="CREATE_EXPENSE"
                editPermission="UPDATE_EXPENSE"
                deletePermission="DELETE_EXPENSE"
                modalTitles={{
                    title: dictionary?.modal?.titleExpenses || 'Подтверждение удаления расходов',
                    message: dictionary?.modal?.messageExpenses || 'Вы уверены, что хотите удалить выбранные расходы?',
                }}
            />
            {pageTotal > 0 && (
                <div className="bg-gray-100 px-4 py-2 flex justify-end gap-4">
                    <span className="font-bold">{"Итоги"}:</span>
                    <span className="font-bold">{pageTotal.toLocaleString()} ₸</span>
                </div>
            )}
        </UiLayout>
    );
};
// В ui/table.tsx
// 'use client';

// import { useMemo } from 'react';
// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { UiLayout, UiPagination, UISearch, UITable, Button } from '@/shared/ui';
// import { useRouter } from 'next/navigation';
// import { useDictionary } from '@/shared/lib/hooks';

// export const Table = () => {
//   const { tableLogic } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();
//   const router = useRouter();
//   const { dictionary } = useDictionary();
//   const { buttons } = dictionary;

//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
//   }, [visibleRows]);

//   const handleRowClick = (row: any) => {
//     router.push(`${ROUTES.editExpense}/${row.original.id}`);
//   };

//   const handleCreateExpense = () => {
//     router.push(ROUTES.createExpense);
//   };

//   const handleDeleteExpenses = () => {
//     const selectedRows = tableLogic.table.getSelectedRowModel().rows;
//     const ids = selectedRows.map((row) => row.original.id);
//     deleteExpenseMutation.mutate(ids, {
//       onSuccess: () => {
//         tableLogic.table.resetRowSelection();
//       },
//     });
//   };

//   return (
//     <UiLayout>
//       <div className="flex flex-col px-5">
//         <div className="flex items-end border-b border-stroke dark:border-dark-3">
//           <div className="flex items-center justify-between gap-4 w-full">
//             <UISearch onSearchChange={tableLogic.setGlobalFilter} />
//             <Button
//                 onClick={handleCreateExpense}
//                 variant="primary"
//                 className="rounded-[7px]"
//               >
//                 {buttons.createExpense}
//             </Button>
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleDeleteExpenses}
//                 variant="danger"
//                 className="rounded-[7px]"
//                 disabled={!tableLogic.table.getSelectedRowModel().rows.length}
//               >
//                 {buttons.delete}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <UITable
//         table={tableLogic.table}
//         handleRowClick={handleRowClick}
//         isIdColumn={false}
//         totals={{ amount: pageTotal }}
//       />
//       <UiPagination table={tableLogic.table} />
//     </UiLayout>
//   );
// };
// import { ROUTES } from '@/shared/constants/routs';
// import { useExpenseTable } from '../model/use-expenses-table';
// import { useDeleteExpenseMutation } from '../model/expenses-api';
// import { GenericTable } from '@/shared/ui';
// import { useMemo } from 'react';

// export const Table = () => {
//   const { tableLogic } = useExpenseTable();
//   const deleteExpenseMutation = useDeleteExpenseMutation();

//   const visibleRows = tableLogic.table.getRowModel().rows;
//   const pageTotal = useMemo(() => {
//     return visibleRows
//       .reduce((sum, row) => sum + Number(row.original.amount), 0)
//   }, [visibleRows]);


//   return (
//     <GenericTable
//       tableLogic={tableLogic}
//       deleteMutation={deleteExpenseMutation}
//       routeCreate={ROUTES.createExpense}
//       routeEdit={ROUTES.editExpense}
//       queryKey='expenses'
//       entityType='expenses'
//       totals={{ amount: pageTotal }}
//     />
//   );
// };
