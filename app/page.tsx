'use client';
import { motion } from 'framer-motion';
import { Header } from "@/components/layouts/Header";
import { Hero } from "@/components/layouts/Hero";
import { Services } from "@/components/layouts/Services";
import { FeaturesCTA } from "@/components/layouts/FeaturesCTA";
import { Footer } from "@/components/layouts/Footer";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        
        {/* About Section - Arabic Premium */}
        <section id="heritage" className="py-20 md:py-32 border-t border-zinc-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-4/5 overflow-hidden rounded-3xl shadow-xl">
                  <img src="/imgs/profile_3.jpeg" alt="إتقان العمل" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-10 shadow-2xl border border-zinc-50 hidden md:block rounded-2xl">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">منذ عام ١٩٩٨</p>
                    <h4 className="text-3xl font-bold text-zinc-900 leading-tight">إتقان يدوي أصيل</h4>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-right"
              >
                <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-4">عنا</span>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight">حيث يلتقي فن الجبس <br /> بالجمال المعماري</h2>
                <p className="text-zinc-500 text-lg leading-relaxed mb-12">
                  نحن في "الصنعة" متخصصون في تنفيذ أرقى الديكورات المعمارية. خبرتنا تمتد لأكثر من ٢٥ عاماً في توريد وتركيب كافة أعمال الجبسوم بورد، وواجهات الـ GRC والـ GRB الخارجية والداخلية، مع الالتزام الكامل بالدقة الهندسية في الفيلات والقصور.
                </p>
                <div className="flex justify-end gap-16 border-t border-zinc-100 pt-12">
                   <div>
                      <div className="text-5xl font-bold text-zinc-900 mb-1">+٥٠٠</div>
                      <div className="text-xs font-bold text-zinc-400">مشروع منفذ</div>
                   </div>
                   <div>
                      <div className="text-5xl font-bold text-zinc-900 mb-1">٢٥</div>
                      <div className="text-xs font-bold text-zinc-400 tracking-tighter">رقم الخبرة</div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Services />

        {/* Portfolio Section - MOBILE OPTIMIZED */}
        <section id="portfolio" className="py-20 md:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6 mb-16">
               <Link href="/projects" className="text-xs font-bold uppercase border-b border-zinc-900 pb-1 hover:text-primary hover:border-primary transition-all">تصفح كل الصور</Link>
               <div className="text-right">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">إبداعاتنا المعمارية</span>
                  <h2 className="text-4xl font-bold text-zinc-900">معرض المشاريع</h2>
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-[300px] sm:h-[450px] overflow-hidden rounded-2xl shadow-lg group">
                <img src="/imgs/profile_4.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="مشروع جبس" />
              </div>
              <div className="h-[300px] sm:h-[450px] sm:col-span-1 lg:col-span-2 overflow-hidden rounded-2xl shadow-lg group">
                <img src="/imgs/profile_11.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="واجهة GRC" />
              </div>
              <div className="h-[300px] overflow-hidden rounded-2xl shadow-lg group">
                <img src="/imgs/profile_12.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="تفاصيل ديكور" />
              </div>
              <div className="h-[300px] overflow-hidden rounded-2xl shadow-lg group">
                <img src="/imgs/profile_6.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="سقف معلق" />
              </div>
              <div className="h-[300px] overflow-hidden rounded-2xl shadow-lg group">
                <img src="/imgs/profile_10.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="كرانيش يدوية" />
              </div>
            </div>
          </div>
        </section>

        <FeaturesCTA />
      </main>

      <Footer />
    </div>
  );
}
