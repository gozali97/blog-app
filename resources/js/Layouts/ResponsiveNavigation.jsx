import {Link, usePage} from '@inertiajs/react';
import React from 'react';
import DropdownMenu from '../Components/DropdownMenu.jsx';

export default function ResponsiveNavigation() {

    const {auth} = usePage().props;
    return (
        <nav className="border-b border-gray-800 fixed w-full mb-4 bg-black px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between">
                <Link className="text-xl font-semibold text-white" href="/">
                    {import.meta.env.VITE_APP_NAME}
                </Link>
                <DropdownMenu
                    toggleAnimate={false}
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    }
                >
                    <DropdownMenu.Dwlink href={'/'}>Home</DropdownMenu.Dwlink>
                    <DropdownMenu.Dwlink href={'/articles'}>
                        Articles
                    </DropdownMenu.Dwlink>
                    {auth.user ? <>
                        <DropdownMenu.Dwlink href={route('dashboard')}>
                            Dashboard
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Dwlink href={'#'}>
                            My profile
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Dwlink href={'#'}>
                            Settings
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Dwlink href={'#'}>
                            My articles
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Dwlink href={'#'}>
                            New article
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Dwlink
                            href={route('logout')}
                            method="POST"
                            as="button"
                        >
                            Logout
                        </DropdownMenu.Dwlink>
                    </>:
                    <>
                        <DropdownMenu.Dwlink href={route('login')}>
                            Login
                        </DropdownMenu.Dwlink>
                        <DropdownMenu.Dwlink href={route('register')}>
                            Register
                        </DropdownMenu.Dwlink>
                    </>
                    }

                </DropdownMenu>
            </div>
        </nav>
    );
}
