
'use client';

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import AppLogo from './AppLogo';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Navbar fluid className="bg-gradient-to-r dark:from-indigo-800 dark:via-blue-900 dark:to-violet-900 bg-transparent">
            <Navbar.Brand href="/">
                <AppLogo />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle className='mr-2 hover:bg-transparent focus:ring-0 dark:hover:bg-transparent'/>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link to="/logout">Logout</Link>
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
                >About
                </Navbar.Link>
                <Navbar.Link href="#" 
                >Services
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
