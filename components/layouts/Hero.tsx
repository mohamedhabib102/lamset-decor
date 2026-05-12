'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative flex items-center pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 z-10 text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                   <span>إتقان في كل تفصيلة</span>
                   <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
                الصنعة | خبراء الجبس <br />
                <span className="text-primary">وواجهات GRB و GRC</span>
              </h1>
              
              <p className="text-xl leading-relaxed text-zinc-500 mb-12 max-w-2xl ml-auto">
                نقدم أدق حلول التوريد والتركيب لأعمال الجبسوم بورد، والأسقف المعلقة، والواجهات الخارجية بنظامي GRC و GRB. خبرة تزيد عن ٢٥ عاماً في خدمة الفيلات والقصور.
              </p>

              <div className="flex flex-col sm:flex-row-reverse items-center gap-4 justify-start">
                <Button href='https://wa.me/+201027227796' size="lg" className="w-full sm:w-auto bg-primary text-white px-12 rounded-none h-14 hover:bg-primary/90">
                  تواصل عبر واتساب
                </Button>
                <Link href="#portfolio" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-zinc-900 text-zinc-900 px-12 rounded-none h-14 hover:bg-zinc-50">
                    معرض المشاريع
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative aspect-3/4 overflow-hidden shadow-2xl rounded-2xl"
            >
              <img 
                src="/imgs/profile_11.jpeg" 
                alt="ديكورات جبس فاخرة" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Floating Decorative Element in Arabic */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="absolute -bottom-10 -right-10 bg-zinc-900 p-8 shadow-xl hidden xl:block rounded-xl"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">أكثر من</div>
              <div className="text-5xl font-black text-white tracking-tighter">٢٥ سنة</div>
              <div className="text-sm font-medium text-primary mt-2">خبرة وإتقان يدوي</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
