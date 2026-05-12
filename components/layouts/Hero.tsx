'use client';
import { motion } from 'framer-motion';


export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f7f4ef]">
      {/* Background Grid Image - Spans entire top */}
      <div 
        className="absolute inset-0 z-0 opacity-60 bg-center bg-repeat mix-blend-multiply"
        style={{ 
          backgroundImage: 'url("/imgs/MainGrid 2.png")',
          backgroundSize: '100% 100%'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-32 md:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-10"
        >
          <h1 className="text-[50px] sm:text-[80px] md:text-[150px] lg:text-[180px] font-bold text-zinc-900 leading-[1.1] md:leading-none tracking-tighter uppercase font-serif">
            EL SANAA
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <p className="text-lg sm:text-xl md:text-3xl text-zinc-600 leading-relaxed font-serif italic mb-6">
            أهلاً بكم في الصنعة للمعمار، حيث نبني إبداعات تتجاوز الخيال.
          </p>
          <p className="text-sm sm:text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
            هنا تندمج الوظيفة مع الجمال لتشكيل أرقى المنشآت للإنسان المعاصر.
          </p>
        </motion.div>

        {/* Floating Decorative Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#c5a059]/20 -translate-y-1/2 hidden lg:block" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#c5a059]/20 -translate-x-1/2 hidden lg:block" />
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">اكتشف المزيد</span>
        <div className="w-0.5 h-16 bg-[#c5a059]" />
      </motion.div>
    </section>
  );
};
