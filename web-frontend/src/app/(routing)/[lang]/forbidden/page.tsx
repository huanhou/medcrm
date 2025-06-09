'use client';

import { useDictionary } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export default function ForbiddenPage() {
    const { dictionary } = useDictionary();
    const router = useRouter();

    return (
        <div className='flex h-screen flex-col items-center justify-center bg-background'>
            <div className='max-w-md text-center'>
                <h1 className='mb-4 text-6xl font-bold text-destructive'>403</h1>
                <h2 className='mb-6 text-2xl font-semibold'>{dictionary.common.forbidden}</h2>
                <p className='mb-8 text-muted-foreground'>{dictionary.common.noPermission}</p>
                <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center'>
                    <Button onClick={() => router.back()} variant='outlined'>
                        {dictionary.common.back}
                    </Button>
                    <Button variant='primary' onClick={() => router.push('/')}>
                        {dictionary.common.goToHomePage}
                    </Button>
                </div>
            </div>
        </div>
    );
}
