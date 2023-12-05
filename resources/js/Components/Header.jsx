import clsx from 'clsx';
import React from 'react';

function Header({ className = '', children }) {
    return (
        <div
            className={clsx(
                className,
                '-mt-10 lg:-mt-4 mb-8 grid grid-cols-1 lg:grid-cols-2 bg-gray-400 dark:bg-gray-800 p-5 lg:px-32 lg:py-10'
            )}
        >
                <div className="flex flex-col my-auto">
                    {children}
                </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1701542183610-60708f7db8f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
        </div>
    );
}
function Title({ children }) {
    return (
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-6xl">
            {children}
        </h1>
    );
}
function Subtitle({ children }) {
    return (
        <h4 className="mt-6 text-xl text-gray-700 dark:text-gray-300 lg:text-2xl leading-relaxed">
            {children}
        </h4>
    );
}
function Content({ children }) {
    return (
        <div className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400 lg:text-xl">
            {children}
        </div>
    );
}

Header.Title = Title;
Header.Subtitle = Subtitle;
Header.Content = Content;

export default Header;
