// 'use client';

// import { UiLayout, Input, Button, Select, UITable } from '@/shared/ui';
// import { ExpenseSchema } from '../lib/expenses-schema';
// import { useUnsavedChanges } from '@/shared/lib/hooks';
// import { useExpenseForm } from '../model/use-expenses-form';
// import { ROUTES } from '@/shared/constants/routs';
// import { useRouter } from 'next/navigation';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
// import { useGetExpenseCategoriesQuery } from '@/shared/api/expense-category';
// import { useMemo } from 'react';

// interface ExpenseFormProps {
//   defaultValues: Partial<ExpenseSchema>;
//   onSubmit: (data: ExpenseSchema) => void;
//   buttonText: string;
//   isLoading: boolean;
// }

// export const ExpenseForm = ({ defaultValues, onSubmit, buttonText, isLoading }: ExpenseFormProps) => {
//   const { data: expenseCategoriesData } = useGetExpenseCategoriesQuery();

//   const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register } = useExpenseForm({
//     defaultValues,
//     onSubmit,
//   });
//   const router = useRouter();
//   const { sharedForm, pages } = dictionary;
//   const shouldPreventNavigation = () => isDirty && !isFormSaved;
//   useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

//   const handleNavigateAway = () => {
//     router.push(ROUTES.expenses);
//   };
//   return (
//     <UiLayout>
//       <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
//         <h1>{buttonText === sharedForm.buttonText.save ? pages.editExpense : pages.createExpense}</h1>
//       </div>
//       <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
//         <Select
//           label={sharedForm.labels.category}
//           error={errors.category_id?.message}
//           icon={<ChevronDownIcon className='size-6 text-gray-6' />}
//           inputProps={{
//             ...register('category_id'),
//             defaultValue: defaultValues.category_id,
//           }}
//         >
//           <option value=''>{sharedForm.placeholders.category}</option>
//           {expenseCategoriesData?.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </Select>
//         <Input
//           label={sharedForm.labels.amount}
//           inputProps={{
//             ...register('amount'),
//             type: 'string',
//             placeholder: sharedForm.placeholders.amount,
//             defaultValue: defaultValues.amount,
//           }}
//           error={errors.amount?.message}
//         />
//         <Input
//           label={sharedForm.labels.description}
//           inputProps={{
//             ...register('description'),
//             type: 'text',
//             placeholder: sharedForm.placeholders.description,
//             defaultValue: defaultValues.description,
//           }}
//           error={errors.description?.message}
//         />
//         <div className='flex gap-2 items-center ml-auto justify-end'>
//           <Button onClick={handleNavigateAway} className='rounded-[7px]' variant='outlined' type='button'>
//             {sharedForm.buttonText.cancel}
//           </Button>
//           <Button isLoading={isLoading} disabled={isLoading} variant='primary' type='submit' className='rounded-[7px]'>
//             {buttonText}
//           </Button>
//         </div>
//       </form>
//     </UiLayout>
//   );
// };


// В ui/shared-form.tsx
'use client';

import { UiLayout, Input, Button, Select } from '@/shared/ui';
import { ExpenseSchema } from '../lib/expenses-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useExpenseForm } from '../model/use-expenses-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useGetExpenseCategoriesQuery } from '@/shared/api/expense-category';

interface ExpenseFormProps {
    defaultValues: Partial<ExpenseSchema>;
    onSubmit: (data: ExpenseSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const ExpenseForm = ({ defaultValues, onSubmit, buttonText, isLoading }: ExpenseFormProps) => {
    const { data: expenseCategoriesData } = useGetExpenseCategoriesQuery();
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register } = useExpenseForm({
        defaultValues,
        onSubmit,
    });
    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.expenses);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editExpense : pages.createExpense}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Select
                    label={sharedForm.labels.category}
                    error={errors.category_id?.message}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    inputProps={{
                        ...register('category_id'),
                        defaultValue: defaultValues.category_id,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.category}</option>
                    {expenseCategoriesData?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
                <Input
                    label={sharedForm.labels.amount}
                    inputProps={{
                        ...register('amount'),
                        type: 'string',
                        placeholder: sharedForm.placeholders.amount,
                        defaultValue: defaultValues.amount,
                    }}
                    error={errors.amount?.message}
                />
                <Input
                    label={sharedForm.labels.description}
                    inputProps={{
                        ...register('description'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.description,
                        defaultValue: defaultValues.description,
                    }}
                    error={errors.description?.message}
                />
                <div className='flex gap-2 items-center ml-auto justify-end'>
                    <Button onClick={handleNavigateAway} className='rounded-[7px]' variant='outlined' type='button'>
                        {sharedForm.buttonText.cancel}
                    </Button>
                    <Button isLoading={isLoading} disabled={isLoading} variant='primary' type='submit' className='rounded-[7px]'>
                        {buttonText}
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
};
// В ui/shared-form.tsx
// 'use client';

// import { UiLayout, Input, Button, Select } from '@/shared/ui';
// import { ExpenseSchema } from '../lib/expenses-schema';
// import { useUnsavedChanges } from '@/shared/lib/hooks';
// import { useExpenseForm } from '../model/use-expenses-form';
// import { ROUTES } from '@/shared/constants/routs';
// import { useRouter } from 'next/navigation';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
// import { useGetExpenseCategoriesQuery } from '@/shared/api/expense-category';

// interface ExpenseFormProps {
//   defaultValues: Partial<ExpenseSchema>;
//   onSubmit: (data: ExpenseSchema) => void;
//   buttonText: string;
//   isLoading: boolean;
// }

// export const ExpenseForm = ({ defaultValues, onSubmit, buttonText, isLoading }: ExpenseFormProps) => {
//   const { data: expenseCategoriesData } = useGetExpenseCategoriesQuery();
//   const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register } = useExpenseForm({
//     defaultValues,
//     onSubmit,
//   });
//   const router = useRouter();
//   const { sharedForm, pages } = dictionary;
//   const shouldPreventNavigation = () => isDirty && !isFormSaved;
//   useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

//   const handleNavigateAway = () => {
//     router.push(ROUTES.expenses);
//   };

//   return (
//     <UiLayout>
//       <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
//         <h1>{buttonText === sharedForm.buttonText.save ? pages.editExpense : pages.createExpense}</h1>
//       </div>
//       <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
//         <Select
//           label={sharedForm.labels.category}
//           error={errors.category_id?.message}
//           icon={<ChevronDownIcon className='size-6 text-gray-6' />}
//           inputProps={{
//             ...register('category_id'),
//             defaultValue: defaultValues.category_id,
//           }}
//         >
//           <option value=''>{sharedForm.placeholders.category}</option>
//           {expenseCategoriesData?.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </Select>
//         <Input
//           label={sharedForm.labels.amount}
//           inputProps={{
//             ...register('amount'),
//             type: 'string',
//             placeholder: sharedForm.placeholders.amount,
//             defaultValue: defaultValues.amount,
//           }}
//           error={errors.amount?.message}
//         />
//         <Input
//           label={sharedForm.labels.description}
//           inputProps={{
//             ...register('description'),
//             type: 'text',
//             placeholder: sharedForm.placeholders.description,
//             defaultValue: defaultValues.description,
//           }}
//           error={errors.description?.message}
//         />
//         <div className='flex gap-2 items-center ml-auto justify-end'>
//           <Button onClick={handleNavigateAway} className='rounded-[7px]' variant='outlined' type='button'>
//             {sharedForm.buttonText.cancel}
//           </Button>
//           <Button isLoading={isLoading} disabled={isLoading} variant='primary' type='submit' className='rounded-[7px]'>
//             {buttonText}
//           </Button>
//         </div>
//       </form>
//     </UiLayout>
//   );
// };

