import { useId } from 'react';

// ShieldLog mark: shield + keyhole. Gradient fill by default; pass `mono` to use currentColor.
export default function ApplicationLogo({ mono = false, ...props }) {
    const id = useId();
    const fill = mono ? 'currentColor' : `url(#${id})`;

    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
            {!mono && (
                <defs>
                    <linearGradient id={id} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#0EA5E9" />
                    </linearGradient>
                </defs>
            )}
            <path
                d="M32 3 8 12v18c0 15 10 27.5 24 31 14-3.500 24-16 24-31V12L32 3Z"
                fill={fill}
            />
            <circle cx="32" cy="27" r="7" fill="#fff" />
            <path d="M29 32h6l2.500 15h-11L29 32Z" fill="#fff" />
            <circle cx="32" cy="27" r="2.800" fill={mono ? 'transparent' : '#4F46E5'} />
        </svg>
    );
}

export function Wordmark({ className = '', mono = false }) {
    return (
        <span className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`}>
            <ApplicationLogo mono={mono} className="h-8 w-8" />
            <span>
                Shield<span className={mono ? '' : 'text-indigo-600'}>Log</span>
            </span>
        </span>
    );
}
