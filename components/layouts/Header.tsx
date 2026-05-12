'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 shadow-sm py-4"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo />
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-600">
              <Link href="/#portfolio" className="hover:text-primary transition-colors">معرض الأعمال</Link>
              <Link href="/#services" className="hover:text-primary transition-colors">خدماتنا</Link>
              <Link href="/#heritage" className="hover:text-primary transition-colors">عنا</Link>
              <Link href="/#contact" className="hover:text-primary transition-colors">اتصل بنا</Link>
            </nav>
          </div>

          <Button href='https://wa.me/+201027227796' size="sm" className="bg-zinc-900 text-white px-8 rounded-none h-11 text-xs font-bold">
            تواصل الأن  
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
