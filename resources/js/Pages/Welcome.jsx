import ApplicationLogo, { Wordmark } from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

const features = [
    {
        icon: '🔐',
        title: 'Strong passwords, enforced',
        text: 'Minimum 8 characters with upper case, lower case, a number and a special character — checked live as you type and again on the server.',
    },
    {
        icon: '📊',
        title: 'Login activity dashboard',
        text: 'See total logins, logins today, unique users and a 14-day trend at a glance.',
    },
    {
        icon: '🛡️',
        title: 'Every attempt logged',
        text: 'Successful logins, logouts and failed attempts are recorded with time, IP address and device.',
    },
];

const rules = [
    'At least 8 characters',
    'One uppercase letter',
    'One lowercase letter',
    'One number',
    'One special character',
];

export default function Welcome({ auth }) {
    const primary =
        'rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';
    const ghost =
        'rounded-lg px-5 py-2.5 font-medium text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50';

    return (
        <>
            <Head title="Secure sign-in with login insights" />
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-700">
                <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <Link href="/" className="text-xl text-gray-900">
                        <Wordmark />
                    </Link>
                    <nav className="flex items-center gap-2 text-sm">
                        {auth.user ? (
                            <Link href={route('dashboard')} className={primary}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900">
                                    Log in
                                </Link>
                                <Link href={route('register')} className={primary}>
                                    Get started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main>
                    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-2 lg:pt-20">
                        <div>
                            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                                Secure authentication
                            </span>
                            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                                Sign-in you can trust,{' '}
                                <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                                    activity you can see.
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-lg text-gray-600">
                                ShieldLog enforces strong password rules and tracks every login, logout and failed
                                attempt in a clean, real-time dashboard.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href={auth.user ? route('dashboard') : route('register')} className={primary}>
                                    {auth.user ? 'Open dashboard' : 'Create free account'}
                                </Link>
                                {!auth.user && (
                                    <Link href={route('login')} className={ghost}>
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-md">
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-200 to-sky-200 opacity-60 blur-2xl" />
                            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
                                <div className="flex items-center gap-3">
                                    <ApplicationLogo className="h-10 w-10" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Create password</div>
                                        <div className="text-xs text-gray-500">Live strength check</div>
                                    </div>
                                </div>
                                <div className="mt-4 rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm tracking-widest text-gray-800">
                                    ••••••••••••
                                </div>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {rules.map((r) => (
                                        <li key={r} className="flex items-center gap-2 text-green-700">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs">
                                                ✓
                                            </span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 pb-20">
                        <div className="grid gap-6 md:grid-cols-3">
                            {features.map((f) => (
                                <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                        {f.icon}
                                    </div>
                                    <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {!auth.user && (
                        <section className="mx-auto max-w-6xl px-6 pb-20">
                            <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-8 py-12 text-center text-white">
                                <h2 className="text-3xl font-bold">Ready to secure your sign-in?</h2>
                                <p className="mt-2 text-indigo-50">Create an account in under a minute.</p>
                                <Link
                                    href={route('register')}
                                    className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 shadow hover:bg-indigo-50"
                                >
                                    Get started
                                </Link>
                            </div>
                        </section>
                    )}
                </main>

                <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShieldLog
                </footer>
            </div>
        </>
    );
}
