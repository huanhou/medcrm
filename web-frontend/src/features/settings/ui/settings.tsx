import { LogoForm } from './logo-form';
import { OrganisationForm } from './organisation-form';

export function Settings() {
    return (
        <div className='grid grid-cols-5 gap-8'>
            <OrganisationForm />
            <LogoForm />
        </div>
    );
}
