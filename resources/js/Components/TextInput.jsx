import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const base =
    'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    if (type !== 'password') {
        return (
            <input
                {...props}
                type={type}
                className={base + className}
                ref={localRef}
            />
        );
    }

    // Password fields get a show/hide (eye) toggle.
    return (
        <div className={`relative ${className}`}>
            <input
                {...props}
                type={visible ? 'text' : 'password'}
                className={`${base}block w-full pe-10`}
                ref={localRef}
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                title={visible ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 end-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                >
                    {visible ? (
                        <>
                            <path d="M3 3l18 18" />
                            <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 8.5 4 9.5 6a12.6 12.6 0 0 1-2.6 3.4M6.6 6.7A12.7 12.7 0 0 0 2.5 12c1 2 4.5 6 9.5 6 1.5 0 2.900-.3 4.100-.9" />
                            <path d="M9.9 9.9a3 3 0 0 0 4.200 4.200" />
                        </>
                    ) : (
                        <>
                            <path d="M2.500 12C3.500 10 7 6 12 6s8.500 4 9.500 6c-1 2-4.500 6-9.500 6S3.500 14 2.500 12Z" />
                            <circle cx="12" cy="12" r="3" />
                        </>
                    )}
                </svg>
            </button>
        </div>
    );
});
