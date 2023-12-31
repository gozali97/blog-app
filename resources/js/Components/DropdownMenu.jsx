import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Link } from '@inertiajs/react';

function DropdownMenu({ toggleAnimate = true, label, children }) {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={clsx(
                            'flex items-center gap-x-2 font-semibold text-gray-900 dark:text-gray-100',
                            open && 'text-gray-900 dark:text-white'
                        )}
                    >
                        {label}
                        {toggleAnimate && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={clsx(
                                    'h-4 w-4 transition duration-200',
                                    open && 'rotate-180'
                                )}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 top-9 w-60 bg-white space-y-1 overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800 px-4 py-5 shadow-sm">
                            {children}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

function Dwlink({ isActive = false, children, ...props }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link className="block w-full text-left" {...props}>
                    <div
                        className={clsx(
                            (active || isActive) ? 'bg-blue-500 text-white w-full' : 'text-gray-800 dark:text-gray-100',
                            'inline-block rounded-lg px-2 py-1 text-left text-sm font-medium'
                        )}
                    >
                        {children}
                    </div>
                </Link>
            )}
        </Menu.Item>
    );
}

function Divider(){
    return <div className="w-full my-2 bg-gradient-to-r from-gray-700 via-transparent to-transparent h-px ml-2"/>
}

DropdownMenu.Dwlink = Dwlink;
DropdownMenu.Divider = Divider;
export default DropdownMenu;
