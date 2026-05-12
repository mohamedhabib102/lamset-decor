'use client';
import React, { useState } from 'react';
import { ControlSidebar } from '@/components/layouts/ControlSidebar';

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfaf7]" dir="rtl">
      {/* Sidebar - Passed props to control layout spacing */}
      <ControlSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Container */}
      <div 
        className={`transition-all duration-500 
          pt-28 md:pt-12 
          ${isCollapsed ? 'md:mr-24' : 'md:mr-80'}
        `}
      >
        <main className="p-4 md:p-12 min-h-[calc(100vh-112px)] md:min-h-screen overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
