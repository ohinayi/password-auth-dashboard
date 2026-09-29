import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const badge = {
    login: 'bg-green-100 text-green-800',
    logout: 'bg-gray-100 text-gray-800',
    failed: 'bg-red-100 text-red-800',
};

function Stat({ label, value }) {
    return (
        <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
    );
}

export default function Dashboard({ stats, chart, logs }) {
    const max = Math.max(1, ...chart.map((c) => c.count));

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                        <Stat label="Total logins" value={stats.totalLogins} />
                        <Stat label="Logins today" value={stats.loginsToday} />
                        <Stat label="Unique users" value={stats.uniqueUsers} />
                        <Stat label="Failed attempts" value={stats.failedAttempts} />
                        <Stat label="Your logins" value={stats.myLogins} />
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold text-gray-800">Logins — last 14 days</h3>
                        <div className="flex h-40 items-end gap-2">
                            {chart.map((c) => (
                                <div key={c.date} className="flex flex-1 flex-col items-center justify-end">
                                    <span className="mb-1 text-xs text-gray-600">{c.count}</span>
                                    <div
                                        className="w-full rounded-t bg-indigo-500"
                                        style={{ height: `${(c.count / max) * 100}%`, minHeight: c.count ? 4 : 1 }}
                                    />
                                    <span className="mt-1 text-[10px] text-gray-500">{c.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
                        <h3 className="p-6 pb-3 font-semibold text-gray-800">Recent activity</h3>
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-6 py-2">Time</th>
                                    <th className="px-6 py-2">Email</th>
                                    <th className="px-6 py-2">Event</th>
                                    <th className="px-6 py-2">IP</th>
                                    <th className="px-6 py-2">Device</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {logs.map((l) => (
                                    <tr key={l.id}>
                                        <td className="whitespace-nowrap px-6 py-2">{l.at}</td>
                                        <td className="px-6 py-2">{l.email}</td>
                                        <td className="px-6 py-2">
                                            <span className={`rounded px-2 py-0.5 text-xs ${badge[l.event]}`}>{l.event}</span>
                                        </td>
                                        <td className="px-6 py-2">{l.ip}</td>
                                        <td className="max-w-xs truncate px-6 py-2 text-gray-500" title={l.agent}>{l.agent}</td>
                                    </tr>
                                ))}
                                {!logs.length && (
                                    <tr><td colSpan="5" className="px-6 py-4 text-gray-500">No activity yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
