'use client';

import Sidebar from '@/components/layout/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Shared Dashboard Sidebar */}
      <Sidebar />

      {/* Main Feature Content Area: Refactored with Compact Padding & Gap */}
      <main className="flex-1 relative flex flex-col h-screen w-full overflow-hidden pb-10 lg:pb-0">
        {/* Background Decorative Blobs (Shared across all feature pages) */}
        <div className="absolute top-0 right-0 size-[500px] brand-gradient rounded-full blur-[150px] opacity-[0.03] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 size-[350px] bg-primary/20 rounded-full blur-[120px] opacity-[0.03] -z-10 -translate-x-1/2 translate-y-1/2" />
        
        {/* Page Content Injection: Dense Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
