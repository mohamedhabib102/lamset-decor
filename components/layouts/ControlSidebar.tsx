'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaStar, FaHome, FaSignOutAlt, FaChevronRight, FaEnvelope } from 'react-icons/fa';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export const ControlSidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'الرئيسية', icon: <FaHome />, href: '/control' },
    { name: 'المشاريع', icon: <FaProjectDiagram />, href: '/control/projects' },
    { name: 'التقييمات', icon: <FaStar />, href: '/control/ratings' },
    { name: 'الرسائل', icon: <FaEnvelope />, href: '/control/messages' },
  ];

  return (
    <>
      {/* Mobile Top Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-zinc-100 z-100 flex items-center justify-around px-4 shadow-sm">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#c5a059]' : 'text-zinc-400'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
        <Link href="/" className="flex flex-col items-center gap-1 text-red-400">
           <FaSignOutAlt className="text-xl rotate-180" />
           <span className="text-[10px] font-bold">خروج</span>
        </Link>
      </nav>

      {/* Desktop Sidebar Container */}
      <aside className={`hidden md:flex bg-white border-l border-zinc-100 flex-col fixed h-full z-50 shadow-sm transition-all duration-500 right-0 
        ${isCollapsed ? 'w-24' : 'w-80'}`}>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-4 top-12 w-8 h-8 bg-[#c5a059] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <FaChevronRight className="text-xs" />
          </motion.div>
        </button>

        <div className={`p-10 pb-6 border-b border-zinc-50 flex flex-col items-center transition-all ${isCollapsed ? 'p-4' : 'p-10'}`}>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-1 bg-[#c5a059]/10 rounded-full"
            >
              <p className="text-[10px] text-[#c5a059] font-black tracking-[0.2em] uppercase">لوحة التحكم</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-3 mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-5 px-5 py-4 rounded-[24px] transition-all duration-300 font-bold group ${
                  isActive 
                  ? 'bg-[#c5a059] text-white shadow-xl shadow-[#c5a059]/25' 
                  : 'text-zinc-400 hover:bg-zinc-50 hover:text-[#c5a059]'
                } ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="text-lg">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 mt-auto border-t border-zinc-50">
          <Link 
            href="/"
            className={`flex items-center gap-5 px-5 py-4 rounded-[24px] text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-bold group ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
          >
            <FaSignOutAlt className="text-xl rotate-180" />
            {!isCollapsed && <span className="text-lg">الموقع</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};
