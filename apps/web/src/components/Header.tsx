"use client";

import React from 'react';
import Link from 'next/link';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from '@clerk/nextjs';

type AppRole = 'customer' | 'mechanic' | 'admin';

const Header = () => {
    const { user } = useUser();
    const role = (user?.publicMetadata?.role ?? 'customer') as AppRole;

    const roleLinks: Record<AppRole, Array<{ href: string; label: string }>> = {
        customer: [
            { href: '/customer', label: 'Customer' },
            { href: '/customer/tracking', label: 'Tracking' },
            { href: '/customer/history', label: 'History' },
            { href: '/customer/profile', label: 'Profile' },
        ],
        mechanic: [
            { href: '/mechanic', label: 'Mechanic' },
        ],
        admin: [
            { href: '/admin', label: 'Admin' },
            { href: '/admin/payments', label: 'Payments' },
            { href: '/admin/jobs', label: 'Jobs' },
        ],
    };

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link className="brand" href="/">Vehicle Services</Link>
                <nav className="nav-links">
                    {roleLinks[role].map((link) => (
                        <Link className="nav-link" key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="nav-links">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="ghost-button" type="button">Sign in</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="flow-cta" type="button">Create account</button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};

export default Header;
