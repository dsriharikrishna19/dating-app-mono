export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Technology', href: '#features' },
    { label: 'Souls', href: '#showcase' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Impact', href: '#stats' },
    { label: 'Safety', href: '#safety' },
];

export const FOOTER_NAV: NavLink[] = [
    { label: 'Our Approach', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Safety Standard', href: '/safety' },
    { label: 'Press Room', href: '/press' },
];

export const FOOTER_SOCIAL: NavLink[] = [
    { label: 'Instagram', href: '#' },
    { label: 'Twitter (X)', href: '#' },
    { label: 'Spotify Playlist', href: '#' },
];
