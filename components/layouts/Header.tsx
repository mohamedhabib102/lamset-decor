'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Logo } from '../ui/Logo';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAdmin = () => {
      const adminCookie = document.cookie.split(';').find(c => c.trim().startsWith('is_admin=true'));
      setIsAdmin(!!adminCookie);
    };
    checkAdmin();
  }, [pathname]);

  const menuLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'مشاريعنا', href: '/projects' },
    { name: 'عن الصنعة', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between h-20 px-6">
            
            {/* Right Section: Request (Desktop Only) */}
            <div className="flex items-center gap-4">
               <Link href="/contact" className="hidden md:flex items-center gap-4 px-8 text-sm font-bold tracking-widest text-zinc-900 uppercase hover:text-[#c5a059] transition-colors">
                  اطلب الآن
               </Link>
               {isAdmin && (
                 <Link href="/control" className="hidden md:flex items-center gap-4 px-6 py-2 bg-[#c5a059]/10 text-[#c5a059] rounded-full text-xs font-bold hover:bg-[#c5a059]/20 transition-all border border-[#c5a059]/10">
                   لوحة التحكم
                 </Link>
               )}
            </div>

            {/* Center Section: Logo */}
            <div className="flex items-center justify-center flex-1">
               <Logo />
            </div>

            {/* Left Section: Menu & Projects */}
            <div className="flex items-center gap-4">
              <Link href="/projects" className="hidden md:flex items-center gap-4 px-8 text-sm font-bold tracking-widest text-zinc-900 uppercase hover:text-[#c5a059] transition-colors">
                المشاريع
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 px-4 h-12 rounded-full hover:bg-zinc-100 active:bg-zinc-200 transition-all group"
              >
                <span className="hidden md:block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">القائمة</span>
                <div className="flex flex-col gap-1.5">
                  <motion.div 
                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[2px] bg-zinc-900 rounded-full" 
                  />
                  <motion.div 
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-4 h-[2px] bg-zinc-900 rounded-full ml-auto" 
                  />
                  <motion.div 
                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[2px] bg-zinc-900 rounded-full" 
                  />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-60 bg-zinc-900 text-white flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-10 p-5 bg-white/5 rounded-full hover:bg-white/10 transition-all"
            >
              <FaTimes className="text-3xl" />
            </button>

            <nav className="flex flex-col items-center gap-10 text-center">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-4xl md:text-7xl font-bold transition-all ${
                      isActive ? 'text-[#c5a059] scale-110' : 'hover:text-[#c5a059]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {isAdmin && (
                 <Link 
                   href="/control" 
                   onClick={() => setIsMenuOpen(false)} 
                   className={`text-4xl md:text-7xl font-bold transition-all ${
                     pathname === '/control' ? 'text-[#c5a059] scale-110' : 'text-[#c5a059]/80 hover:text-[#c5a059]'
                   }`}
                 >
                   لوحة التحكم
                 </Link>
              )}
            </nav>

            <div className="mt-20 flex flex-col items-center gap-4">
              <div className="w-12 h-[2px] bg-[#c5a059]" />
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                BUILDING EXCELLENCE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
