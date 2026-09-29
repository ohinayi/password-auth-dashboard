import { Wordmark } from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 pt-6 sm:justify-center sm:pt-0">
            <Link href="/" className="text-2xl text-gray-900">
                <Wordmark />
            </Link>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-6 shadow-xl ring-1 ring-gray-100 sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
