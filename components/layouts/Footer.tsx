import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] py-20 border-t border-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              BUILDING EXCELLENCE
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#c5a059] transition-colors">الرئيسية</Link>
            <Link href="/about" className="hover:text-[#c5a059] transition-colors">عنا</Link>
            <Link href="/projects" className="hover:text-[#c5a059] transition-colors">المشاريع</Link>
            <Link href="/contact" className="hover:text-[#c5a059] transition-colors">اتصل بنا</Link>
          </div>

          <div className="text-center md:text-right">
             <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-4">
               &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
             </p>
             <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em]">
               Designed with passion
             </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
