import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Settings } from '@/features/settings/ui';

export const SettingsPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='settings' />
            <Settings />
        </DefaultLayout>
    );
};
