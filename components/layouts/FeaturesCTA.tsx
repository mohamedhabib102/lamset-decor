'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { FaAward, FaUserTie, FaClock, FaGem, FaWhatsapp } from 'react-icons/fa';

const features = [
  {
    title: "الجودة",
    icon: <FaAward className="w-12 h-12 text-[#c5a059]" />,
    label: "خامات أصلية"
  },
  {
    title: "الاحترافية",
    icon: <FaUserTie className="w-12 h-12 text-[#c5a059]" />,
    label: "فنيون خبراء"
  },
  {
    title: "السرعة",
    icon: <FaClock className="w-12 h-12 text-[#c5a059]" />,
    label: "دقة المواعيد"
  },
  {
    title: "الفخامة",
    icon: <FaGem className="w-12 h-12 text-[#c5a059]" />,
    label: "تشطيب ملكي"
  }
];

export const FeaturesCTA = () => {
  return (
    <section className="bg-white py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Vertical Scrolling Features */}
          <div className="relative h-[500px] overflow-hidden group rounded-[40px] border border-zinc-100 bg-zinc-50/50">
            <motion.div 
              animate={{ y: [0, -600] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex flex-col gap-10 p-10"
            >
              {[...features, ...features].map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-12 bg-white rounded-[40px] shadow-sm border border-zinc-50 transition-transform hover:scale-105"
                >
                  <div className="mb-8">{feature.icon}</div>
                  <h4 className="text-3xl font-bold text-zinc-900 mb-3">{feature.title}</h4>
                  <p className="text-[#c5a059] font-black tracking-widest text-xs uppercase">{feature.label}</p>
                </div>
              ))}
            </motion.div>
            
            {/* Fade Overlays */}
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-zinc-50/50 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-50/50 to-transparent z-10" />
          </div>

          {/* CTA Content */}
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-end gap-4 mb-8"
            >
              <div className="h-[2px] w-12 bg-[#c5a059]" />
              <span className="text-sm font-black text-[#c5a059] uppercase tracking-widest">لماذا تختارنا؟</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-zinc-900 mb-10 leading-[1.1]"
            >
              نحن نبني مساحات <br /> <span className="text-zinc-400 font-light">تحاكي الخيال</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-xl mb-14 max-w-xl ml-auto leading-relaxed"
            >
              نحن لا نصمم فقط، نحن نصنع تجارب عمرانية فريدة تجمع بين الفخامة والعملية. كل مشروع بالنسبة لنا هو لوحة فنية نضع فيها كل خبرتنا وإبداعنا اليدوي الأصيل.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row-reverse items-center gap-6 justify-start"
            >
              <Button href='https://wa.me/+201027227796' size="lg" className="bg-[#c5a059] text-white px-14 rounded-full h-20 hover:bg-[#b08e4a] flex items-center gap-4 text-xl shadow-2xl shadow-[#c5a059]/30 transition-all active:scale-95">
                  ابدأ مشروعك الآن
                  <FaWhatsapp className="text-3xl" />
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
