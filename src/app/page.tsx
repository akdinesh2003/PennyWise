"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/penny-wise/header';
import { DashboardGrid } from '@/components/penny-wise/dashboard-grid';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  const handleProfileUpdate = (name: string, email: string) => {
    // This will be handled by Firebase now, but we can keep the prop for optimistic updates if needed.
    // For now, we can leave it empty as the user object from useUser will update automatically.
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onProfileUpdate={handleProfileUpdate} />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <DashboardGrid />
      </main>
    </div>
  );
}
