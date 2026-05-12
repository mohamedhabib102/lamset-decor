'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  url: string;
}

export const PortfolioPreview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
        });
        const data = await res.json();
        setProjects(data.result?.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-24 md:py-40 bg-[#fcfaf7]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-10 mb-20">
           <Link href="/projects" className="text-sm font-bold uppercase border-b-2 border-zinc-900 pb-2 hover:text-[#c5a059] hover:border-[#c5a059] transition-all tracking-widest">تصفح كل الصور</Link>
           <div className="text-right">
              <div className="flex items-center justify-end gap-4 mb-4">
                <div className="h-[2px] w-12 bg-[#c5a059]" />
                <span className="text-[#c5a059] text-sm font-black uppercase tracking-widest">إبداعاتنا المعمارية</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold text-zinc-900 leading-none">معرض المشاريع</h2>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-zinc-100 animate-pulse rounded-[40px]" />
            ))
          ) : (
            projects.map((item, idx) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[40px] shadow-2xl shadow-zinc-200/50 group h-[400px] cursor-pointer"
              >
                <img src={item.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                   <div className="w-12 h-[2px] bg-[#c5a059] mb-4" />
                   <p className="text-white font-bold text-xl">{item.title}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
