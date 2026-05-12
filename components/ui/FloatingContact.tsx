'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaCommentDots, FaTimes } from 'react-icons/fa';

export const FloatingContact = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // إخفاء المكون تماماً إذا كنا داخل لوحة التحكم
  if (pathname?.startsWith('/control')) return null;

  const contactLinks = [
    {
      name: 'واتساب',
      icon: <FaWhatsapp />,
      color: 'bg-[#25D366]',
      href: 'https://wa.me/+201027227796',
    },
    {
      name: 'فيسبوك',
      icon: <FaFacebookF />,
      color: 'bg-[#1877F2]',
      href: 'https://www.facebook.com/', 
    },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-100 flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-3 mb-2">
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className={`${link.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform`}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#c5a059] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl z-10"
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </motion.button>
    </div>
  );
};
