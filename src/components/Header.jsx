import avatar from "../assets/nkin.jpg";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import AppLogo from './AppLogo';
import { Link } from 'react-router-dom';

export default function Header({ user }) {
    return (
        <Navbar fluid className="shadow-sm bg-gradient-to-r from-sky-100 via-slate-200 to-sky-100 dark:from-indigo-800 dark:via-blue-900 dark:to-violet-900 bg-transparent">
            <Navbar.Brand href="/">
                <AppLogo />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle className='mr-2 hover:bg-transparent focus:ring-0 dark:hover:bg-transparent' />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={user.photo_src ?? avatar} rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user.name}</span>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <Link to="/logout" className="flex gap-2">
                            <div>
                                <svg className="w-6 h-6 rotate-180 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                                </svg>
                            </div>
                            <div>Logout</div>
                        </Link>
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#"
                    active
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="#"
                >Projects
                </Navbar.Link>
                <Navbar.Link href="#"
                >Workspaces
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
