import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import React from 'react';

export default function ButtonLink({ active = false, children, ...props }) {
    return (
        <Link
            className={clsx(
                active && 'font-bold underline',
                'inline-block rounded px-4 py-2 text-gray-900 dark:text-white'
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
