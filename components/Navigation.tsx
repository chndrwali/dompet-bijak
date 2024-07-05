'use client';

import { usePathname } from 'next/navigation';
import NavButton from '@/components/Nav-button';

const routes = [
  {
    href: '/',
    label: 'Ringkasan',
  },
  {
    href: '/transactions',
    label: 'Transaksi',
  },
  {
    href: '/accounts',
    label: 'Akun',
  },
  {
    href: '/categories',
    label: 'Kategori',
  },
  {
    href: '/settings',
    label: 'Setelan',
  },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} isActive={pathname === route.href} />
      ))}
    </nav>
  );
};

export default Navigation;
