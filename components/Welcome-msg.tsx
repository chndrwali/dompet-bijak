'use client';

import { useUser } from '@clerk/nextjs';

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium ">
        Selamat Datang{isLoaded ? ',' : ''}
        {user?.firstName}👋🏻
      </h2>
      <p className="text-sm lg:text-base text-white/90">Ini adalah Laporan Keuangan Anda</p>
    </div>
  );
};

export default WelcomeMsg;
