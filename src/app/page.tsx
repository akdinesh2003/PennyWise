"use client";

import { useState } from 'react';
import { Header } from '@/components/penny-wise/header';
import { DashboardGrid } from '@/components/penny-wise/dashboard-grid';
import { user as initialUser } from '@/lib/data';

export default function Home() {
  const [user, setUser] = useState(initialUser);

  const handleProfileUpdate = (newName: string, newEmail: string) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName,
      // email is not part of the user object yet, but let's handle it
    }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header user={user} onProfileUpdate={handleProfileUpdate} />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <DashboardGrid />
      </main>
    </div>
  );
}
