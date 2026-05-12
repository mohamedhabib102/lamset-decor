'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { FaAward, FaUserTie, FaClock, FaGem, FaWhatsapp } from 'react-icons/fa';

const features = [
  {
    title: "الجودة",
    icon: <FaAward className="w-8 h-8 text-primary" />,
    label: "خامات أصلية"
  },
  {
    title: "الاحترافية",
    icon: <FaUserTie className="w-8 h-8 text-primary" />,
    label: "فنيون خبراء"
  },
  {
    title: "السرعة",
    icon: <FaClock className="w-8 h-8 text-primary" />,
    label: "دقة المواعيد"
  },
  {
    title: "الفخامة",
    icon: <FaGem className="w-8 h-8 text-primary" />,
    label: "تشطيب ملكي"
  }
];

export const FeaturesCTA = () => {
  return (
    <section id="contact" className="bg-white">
      {/* Black Features Bar */}
      <div className="bg-zinc-900 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <div className="mb-2 p-3 bg-white/5 rounded-full">{feature.icon}</div>
                <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                <p className="text-zinc-500 text-xs font-medium tracking-widest">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 md:py-32 border-b border-zinc-100">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8 leading-tight"
          >
            هل أنت مستعد لتحويل <br /> رؤيتك إلى واقع؟
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 text-lg mb-12 max-w-2xl mx-auto"
          >
            فريقنا جاهز لمناقشة مشروعك وتقديم الحلول الهندسية والجمالية الأمثل لمنزلك.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <Button href='https://wa.me/+201027227796' size="lg" className="w-full sm:w-[300px] bg-zinc-900 text-white px-10 rounded-none h-14 hover:bg-zinc-800 flex items-center justify-center gap-3">
                تواصل معنا عبر واتساب
                <FaWhatsapp className="text-xl" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
