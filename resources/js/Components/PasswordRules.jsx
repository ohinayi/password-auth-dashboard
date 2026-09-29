export const passwordRules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'One number', test: (p) => /\d/.test(p) },
    { label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function PasswordRules({ password }) {
    return (
        <ul className="mt-2 space-y-1 text-sm">
            {passwordRules.map((r) => {
                const ok = r.test(password);
                return (
                    <li key={r.label} className={ok ? 'text-green-600' : 'text-gray-500'}>
                        {ok ? '✓' : '○'} {r.label}
                    </li>
                );
            })}
        </ul>
    );
}
