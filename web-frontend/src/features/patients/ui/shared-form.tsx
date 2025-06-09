'use client';

import { UiLayout, Input, Button, PhoneInput, Select, TextArea } from '@/shared/ui';
import { PatientSchema } from '../lib/patients-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { usePatientForm } from '../model/use-patients-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { useHookFormMask } from 'use-mask-input';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useGetFilialsQuery } from '@/shared/api/filials-api';

interface PatientFormProps {
    defaultValues: Partial<PatientSchema>;
    onSubmit: (data: PatientSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const PatientForm = ({ defaultValues, onSubmit, buttonText, isLoading }: PatientFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register } = usePatientForm({
        defaultValues,
        onSubmit,
    });
    const { data: filials } = useGetFilialsQuery();
    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const registerWithMask = useHookFormMask(register);
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.patients);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editPatient : pages.createPatient}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Input
                    label={sharedForm.labels.fullName}
                    inputProps={{
                        ...register('fio'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.fullName,
                        defaultValue: defaultValues.fio,
                    }}
                    error={errors.fio?.message}
                />
                <PhoneInput
                    label={dictionary.SignUp.phone}
                    registerWithMask={registerWithMask}
                    name='phone'
                    error={errors.phone?.message as string}
                    className='mb-4.5'
                    placeholder={dictionary.SignUp.phonePlaceHolder}
                />
                <Input
                    label={sharedForm.labels.iin}
                    inputProps={{
                        ...register('iin'),
                        type: 'number',
                        placeholder: sharedForm.placeholders.iin,
                        defaultValue: defaultValues.iin,
                    }}
                    error={errors.iin?.message}
                />
                <Select
                    label={sharedForm.labels.branch}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    error={errors.filial_id?.message}
                    inputProps={{
                        ...register('filial_id'),
                        defaultValue: defaultValues.filial_id,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.branch}</option>
                    {filials?.map((filial) => (
                        <option key={filial.id} value={filial.id}>
                            {filial.name}
                        </option>
                    ))}
                </Select>

                <TextArea
                    label={sharedForm.labels.description}
                    textAreaProps={{
                        ...register('description'),
                        placeholder: sharedForm.placeholders.description,
                        defaultValue: defaultValues.description,
                    }}
                    error={errors.description?.message}
                    className="mb-4"
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

// components/PatientAppointmentForm.tsx
// 'use client';

// import { UiLayout, Input, Button, PhoneInput, Select, TextArea } from '@/shared/ui';
// import { useUnsavedChanges } from '@/shared/lib/hooks';
// // import { usePatientAppointmentForm } from '../model/use-patient-appointment-form';
// import { usePatientAppointmentForm } from '../model/use-patients-form';
// import { ROUTES } from '@/shared/constants/routs';
// import { useRouter } from 'next/navigation';
// import { useHookFormMask } from 'use-mask-input';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
// import { useGetFilialsQuery } from '@/shared/api/filials-api';
// import { useGetStaffQuery } from '@/shared/api/staff-api'; // Предполагаемый API для сотрудников
// import { useGetServicesQuery } from '@/shared/api/services-api'; // Предполагаемый API для услуг
// import { DictionaryType } from '@/shared/config/i18n';
// import { PatientAppointmentSchema } from '../lib/patients-schema';

// interface PatientAppointmentFormProps {
//   defaultValues: Partial<PatientAppointmentSchema>;
//   onSubmit: (data: PatientAppointmentSchema) => void;
//   buttonText: string;
//   isLoading: boolean;
//   dictionary: DictionaryType;
// }

// export const PatientAppointmentForm = ({
//   defaultValues,
//   onSubmit,
//   buttonText,
//   isLoading,
//   dictionary,
// }: PatientAppointmentFormProps) => {
//   const { handleSubmit, errors, isDirty, isFormSaved, register } = usePatientAppointmentForm({
//     defaultValues,
//     onSubmit,
//     dictionary,
//   });
//   const { data: filials } = useGetFilialsQuery();
//   const { data: staff } = useGetStaffQuery(); // Предполагаемый хук для сотрудников
//   const { data: services } = useGetServicesQuery(); // Предполагаемый хук для услуг
//   const router = useRouter();
//   const { sharedForm, pages } = dictionary;
//   const registerWithMask = useHookFormMask(register);
//   const shouldPreventNavigation = () => isDirty && !isFormSaved;
//   useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

//   const handleNavigateAway = () => {
//     router.push(ROUTES.patients);
//   };

//   return (
//     <UiLayout>
//       <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
//         <h1>{buttonText === sharedForm.buttonText.save ? pages.editPatient : pages.createPatient}</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4 p-3.5">
//         {/* Поля AppointmentSchema (сначала) */}
//         <Input
//           label={sharedForm.labels.patientId} // Предполагаем, что это поле будет скрыто или автозаполнено
//           inputProps={{
//             ...register('patient_id'),
//             type: 'hidden', // Скрываем, так как пациент создается в этой форме
//             defaultValue: defaultValues.patient_id || 'new', // Логика для нового пациента
//           }}
//         />
//         <Select
//           label={sharedForm.labels.staff}
//           icon={<ChevronDownIcon className="size-6 text-gray-6" />}
//           error={errors.staff_id?.message}
//           inputProps={{
//             ...register('staff_id'),
//             defaultValue: defaultValues.staff_id,
//           }}
//         >
//           <option value="">{sharedForm.placeholders.staff}</option>
//           {staff?.map((member) => (
//             <option key={member.id} value={member.id}>
//               {member.name}
//             </option>
//           ))}
//         </Select>
//         <Input
//           label={sharedForm.labels.dateTime}
//           inputProps={{
//             ...register('date_time'),
//             type: 'datetime-local',
//             defaultValue: defaultValues.date_time,
//           }}
//           error={errors.date_time?.message}
//         />
//         <TextArea
//           label={sharedForm.labels.comment}
//           textAreaProps={{
//             ...register('comment'),
//             placeholder: sharedForm.placeholders.comment,
//             defaultValue: defaultValues.comment,
//           }}
//           error={errors.comment?.message}
//           className="mb-4"
//         />
//         <Select
//           label={sharedForm.labels.service}
//           icon={<ChevronDownIcon className="size-6 text-gray-6" />}
//           error={errors.service_ids?.message}
//           inputProps={{
//             ...register('service_ids'),
//             multiple: true, // Множественный выбор для массива
//             defaultValue: defaultValues.service_ids,
//           }}
//         >
//           <option value="">{sharedForm.placeholders.service}</option>
//           {services?.map((service) => (
//             <option key={service.id} value={service.id}>
//               {service.name}
//             </option>
//           ))}
//         </Select>
//         <Select
//           label={sharedForm.labels.status}
//           icon={<ChevronDownIcon className="size-6 text-gray-6" />}
//           error={errors.status?.message}
//           inputProps={{
//             ...register('status'),
//             defaultValue: defaultValues.status,
//           }}
//         >
//           <option value="">{sharedForm.placeholders.status}</option>
//           <option value="scheduled">Запланировано</option>
//           <option value="completed">Завершено</option>
//           <option value="canceled">Отменено</option>
//         </Select>

//         {/* Поля PatientSchema (потом) */}
//         <Input
//           label={sharedForm.labels.fullName}
//           inputProps={{
//             ...register('fio'),
//             type: 'text',
//             placeholder: sharedForm.placeholders.fullName,
//             defaultValue: defaultValues.fio,
//           }}
//           error={errors.fio?.message}
//         />
//         <PhoneInput
//           label={dictionary.SignUp.phone}
//           registerWithMask={registerWithMask}
//           name="phone"
//           error={errors.phone?.message as string}
//           className="mb-4.5"
//           placeholder={dictionary.SignUp.phonePlaceHolder}
//         />
//         <Input
//           label={sharedForm.labels.iin}
//           inputProps={{
//             ...register('iin'),
//             type: 'text', // Оставляем текст, так как это строка с проверкой на цифры
//             placeholder: sharedForm.placeholders.iin,
//             defaultValue: defaultValues.iin,
//           }}
//           error={errors.iin?.message}
//         />
//         <Select
//           label={sharedForm.labels.branch}
//           icon={<ChevronDownIcon className="size-6 text-gray-6" />}
//           error={errors.filial_id?.message}
//           inputProps={{
//             ...register('filial_id'),
//             defaultValue: defaultValues.filial_id,
//           }}
//         >
//           <option value="">{sharedForm.placeholders.branch}</option>
//           {filials?.map((filial) => (
//             <option key={filial.id} value={filial.id}>
//               {filial.name}
//             </option>
//           ))}
//         </Select>
//         <TextArea
//           label={sharedForm.labels.description}
//           textAreaProps={{
//             ...register('description'),
//             placeholder: sharedForm.placeholders.description,
//             defaultValue: defaultValues.description,
//           }}
//           error={errors.description?.message}
//           className="mb-4"
//         />

//         {/* Кнопки */}
//         <div className="flex gap-2 items-center ml-auto justify-end">
//           <Button onClick={handleNavigateAway} className="rounded-[7px]" variant="outlined" type="button">
//             {sharedForm.buttonText.cancel}
//           </Button>
//           <Button isLoading={isLoading} disabled={isLoading} variant="primary" type="submit" className="rounded-[7px]">
//             {buttonText}
//           </Button>
//         </div>
//       </form>
//     </UiLayout>
//   );
// };
// 'use client';

// import { UiLayout, Input, Button, PhoneInput, Select, DateTimePicker, TextArea, MultiSelect } from '@/shared/ui';
// import { useUnsavedChanges } from '@/shared/lib/hooks';
// // import { usePatientAppointmentForm, useServiceSelect } from '../model/use-patient-appointment-form';
// import { usePatientAppointmentForm,useServiceSelect } from '../model/use-patients-form';
// import { ROUTES } from '@/shared/constants/routs';
// import { useRouter } from 'next/navigation';
// import { useHookFormMask } from 'use-mask-input';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
// import { useGetFilialsQuery } from '@/shared/api/filials-api';
// import { useGetDoctorsQuery } from '@/shared/api/services-api'; // Предполагаем, что это для врачей
// import { useGetServicesQuery } from '@/shared/api/services-api';
// import { useMemo } from 'react';
// import { PatientAppointmentSchema } from '../lib/patients-schema';

// interface PatientAppointmentFormProps {
//   defaultValues: Partial<PatientAppointmentSchema>;
//   onSubmit: (data: PatientAppointmentSchema) => void;
//   buttonText: string;
//   isLoading: boolean;
// }

// /**
//  * Компонент формы для создания/редактирования пациента и записи на прием
//  * @param defaultValues - Начальные значения формы
//  * @param onSubmit - Функция отправки данных
//  * @param buttonText - Текст кнопки отправки
//  * @param isLoading - Состояние загрузки
//  */
// export const PatientAppointmentForm = ({ defaultValues, onSubmit, buttonText, isLoading }: PatientAppointmentFormProps) => {
//   const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register, watch, setValue } = usePatientAppointmentForm({
//     defaultValues,
//     onSubmit,
//   });

//   const router = useRouter();
//   const { sharedForm, pages } = dictionary;
//   const registerWithMask = useHookFormMask(register);
//   const shouldPreventNavigation = () => isDirty && !isFormSaved;
//   useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

//   const handleNavigateAway = () => {
//     router.push(ROUTES.patients); // Можно изменить на ROUTES.appointments в зависимости от контекста
//   };

//   return (
//     <UiLayout>
//       <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
//         <h1>{buttonText === sharedForm.buttonText.save ? pages.editPatient : pages.createPatient}</h1>
//       </div>
//       <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
//         {/* Поля пациента */}
//         <Input
//           label={sharedForm.labels.fullName}
//           inputProps={{
//             ...register('fio'),
//             type: 'text',
//             placeholder: sharedForm.placeholders.fullName,
//             defaultValue: defaultValues.fio,
//           }}
//           error={errors.fio?.message}
//         />
//         <PhoneInput
//           label={dictionary.SignUp.phone}
//           registerWithMask={registerWithMask}
//           name="phone"
//           error={errors.phone?.message as string}
//           className='mb-4.5'
//           placeholder={dictionary.SignUp.phonePlaceHolder}
//         />
//         <Input
//           label={sharedForm.labels.iin}
//           inputProps={{
//             ...register('iin'),
//             type: 'text', // Используем текст, так как валидация проверяет длину и цифры
//             placeholder: sharedForm.placeholders.iin,
//             defaultValue: defaultValues.iin,
//           }}
//           error={errors.iin?.message}
//         />
//         <Select
//           label={sharedForm.labels.branch}
//           icon={<ChevronDownIcon className='size-6 text-gray-6' />}
//           error={errors.filial_id?.message}
//           inputProps={{
//             ...register('filial_id'),
//             defaultValue: defaultValues.filial_id,
//           }}
//         >
//           <option value=''>{sharedForm.placeholders.branch}</option>
//           {filials?.map((filial) => (
//             <option key={filial.id} value={filial.id}>
//               {filial.name}
//             </option>
//           ))}
//         </Select>
//         <TextArea
//           label={sharedForm.labels.description}
//           textAreaProps={{
//             ...register('description'),
//             placeholder: sharedForm.placeholders.description,
//             defaultValue: defaultValues.description,
//           }}
//           error={errors.description?.message}
//           className="mb-4"
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