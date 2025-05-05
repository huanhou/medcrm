import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';

const atAvant = localFont({
    src: [
        {
            path: './fonts/at-avant/AT_Avant.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    display: 'swap',

    variable: '--font-atAvant',
});

export function Logo() {
    return (
        <Link
            href='/'
            className='mx-auto mb-7.5 inline-flex items-center gap-4'
            style={{ fontFamily: atAvant.style.fontFamily }}
        >
            <Image width={30} height={30} src={'/assets/logo/logo.svg'} alt='Logo' priority />
            <p className=' text-black font-bold text-xl lg:text-[26px] leading-10 dark:text-stroke'>MedCRM</p>
        </Link>
    );
}
