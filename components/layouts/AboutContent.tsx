'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AboutContent = () => {
  const [stats, setStats] = useState({ projects: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, ratRes] = await Promise.all([
          fetch('/api/projects', { headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string } }),
          fetch('/api/ratings', { headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string } })
        ]);
        const projData = await projRes.json();
        const ratData = await ratRes.json();
        setStats({
          projects: projData.result?.length || 0,
          ratings: ratData.data?.length || 0
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-4/5 overflow-hidden rounded-3xl shadow-xl">
              <img src="/imgs/profile_3.jpeg" alt="إتقان العمل في الصنعة" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-10 shadow-2xl border border-zinc-50 hidden md:block rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#c5a059] mb-2">جودة هندسية</p>
                <h4 className="text-3xl font-bold text-zinc-900 leading-tight">إتقان يدوي أصيل</h4>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right order-1 lg:order-2"
          >
            <span className="text-[#c5a059] font-bold text-sm uppercase tracking-widest block mb-4">عنا</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight">حيث يلتقي فن الجبس <br /> بالجمال المعماري</h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-12">
              نحن في "الصنعة" نؤمن بأن كل جدار وسقف هو فرصة للإبداع. نتخصص في تنفيذ أرقى الديكورات المعمارية باستخدام أفضل الخامات العالمية. فريقنا يجمع بين الفن والهندسة لتنفيذ أعمال الجبسوم بورد، والأسقف المعلقة، وواجهات الـ GRC والـ GRB التي تمنح الفيلات والقصور هيبتها وفخامتها.
            </p>
            
            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed">
              <p>
                منذ انطلاقنا، وضعنا نصب أعيننا هدفاً واحداً: إعادة تعريف مفهوم التشطيبات الفاخرة. نحن لا نقوم فقط بتركيب الجبس، بل نصنع تحفاً فنية تعيش لعقود.
              </p>
              <p>
                خدماتنا تشمل التصميم والتنفيذ والإشراف على كافة أعمال الديكور الخارجي والداخلي، مع التركيز على التفاصيل الدقيقة التي تجعل من كل مشروع حالة فريدة.
              </p>
            </div>

            <div className="flex justify-end gap-16 border-t border-zinc-100 pt-12 mt-12">
               <div>
                  <div className="text-5xl font-bold text-zinc-900 mb-1">{stats.projects}+</div>
                  <div className="text-xs font-bold text-zinc-400">مشروع منفذ</div>
               </div>
               <div>
                  <div className="text-5xl font-bold text-zinc-900 mb-1">{stats.ratings}+</div>
                  <div className="text-xs font-bold text-zinc-400 tracking-tighter">تقييم إيجابي</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
