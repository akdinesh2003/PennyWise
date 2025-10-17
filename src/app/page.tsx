import { Header } from '@/components/penny-wise/header';
import { DashboardGrid } from '@/components/penny-wise/dashboard-grid';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <DashboardGrid />
      </main>
    </div>
  );
}
