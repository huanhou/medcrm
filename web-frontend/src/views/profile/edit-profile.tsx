import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { ProfileForm } from '@/features/profile/ui';

export const EditProfile = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='profileEdit' />
            <ProfileForm />
        </DefaultLayout>
    );
};
