'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AppNavbar from './AppNavbar';
import { useAppSelector } from '@/store/hooks';

const AUTH_PREFIX = '/auth';

export default function NavbarSwitcher() {
    const pathname = usePathname();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (pathname.startsWith(AUTH_PREFIX)) {
        return null;
    }

    if (isAuthenticated) {
        return <AppNavbar />;
    }

    return <Navbar />;
}

