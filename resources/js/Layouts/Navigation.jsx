import React from 'react';
import {Link, usePage} from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import DropdownMenu from '@/Components/DropdownMenu';
import ResponsiveNavigation from '@/Layouts/ResponsiveNavigation';
import {DarkModeSwitch} from "react-toggle-dark-mode";
import clsx from 'clsx';

export default function Navigation() {
    const {auth, category_global} = usePage().props

    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <>
            <ResponsiveNavigation />
            <nav className="hidden fixed z-50 w-screen border-b bg-white border:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 py-4 shadow lg:block">
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={route('home')}
                            className="mr-3 text-lg font-semibold capitalize text-gray-900 dark:text-white"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>

                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <NavLink
                                    href={route('home')}
                                    active={route().current('home')}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href={route('articles.index')}
                                    active={route().current('articles.index')}
                                >
                                    Article
                                </NavLink>
                                {category_global.map((category) => (
                                    <NavLink
                                        href={route('category.show', category.slug)}
                                        key={category.slug}
                                        active={route().current('category.show', category.slug)}>
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                            <div className="flex items-center mr-6">
                                <DarkModeSwitch
                                    className={clsx(
                                        isDarkMode && 'text-white',
                                        !isDarkMode && 'text-black',
                                        'mr-4')}
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={20}
                                />

                                {auth.user ? (
                                    <div className="flex items-center">
                                    <DropdownMenu label={auth.user.name}>
                                        <DropdownMenu.Dwlink
                                            href={route('dashboard')}
                                        >
                                            Dashboard
                                        </DropdownMenu.Dwlink>
                                        <DropdownMenu.Dwlink href='/profile'>
                                            My profile
                                        </DropdownMenu.Dwlink>
                                        <DropdownMenu.Dwlink href={'#'}>
                                            Settings
                                        </DropdownMenu.Dwlink>
                                        <DropdownMenu.Divider/>
                                        {auth.user.hasRole ? <>
                                        <DropdownMenu.Dwlink href={route('article.table')}>
                                            My articles
                                        </DropdownMenu.Dwlink>
                                        <DropdownMenu.Dwlink href={route('articles.create')}>
                                            New article
                                        </DropdownMenu.Dwlink>
                                            </> : null}
                                        <DropdownMenu.Divider/>
                                        <DropdownMenu.Dwlink
                                            href={route('logout')}
                                            method="POST"
                                            as="button"
                                        >
                                            Logout
                                        </DropdownMenu.Dwlink>
                                    </DropdownMenu>
                                    </div>
                                    ):
                                    (
                                    <div className="flex items-center">
                                        <NavLink href={route('login')}>
                                            Login
                                        </NavLink>
                                        <NavLink href={route('register')}>
                                            Register
                                        </NavLink>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
