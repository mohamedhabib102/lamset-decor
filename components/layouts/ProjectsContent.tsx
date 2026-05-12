'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  url: string;
}

export const ProjectsContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
        });
        const data = await res.json();
        setProjects(data.result || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-[#c5a059]">
      <FaSpinner className="animate-spin text-5xl" />
    </div>
  );

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-32">
        <div className="text-right mb-24">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-end gap-4 mb-6"
            >
                <div className="h-[2px] w-12 bg-[#c5a059]" />
                <span className="text-[#c5a059] text-sm font-black uppercase tracking-widest">إبداعاتنا المعمارية</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-8xl font-bold text-zinc-900 mb-8 leading-none"
            >
                كل أعمالنا
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-zinc-500 text-xl max-w-2xl ml-auto leading-relaxed"
            >
                استكشف مجموعة كاملة من مشاريعنا في تنفيذ ديكورات الجبس، الأسقف المعلقة، وواجهات GRC والـ GRB بأعلى مستويات الإتقان العالمي.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project, index) => (
                <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    className="aspect-4/5 overflow-hidden rounded-[30px] shadow-xl group relative"
                >
                    <img 
                        src={project.url} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-right">
                       <div className="w-8 h-[2px] bg-[#c5a059] mb-4" />
                       <span className="text-white font-bold text-lg">{project.title}</span>
                    </div>
                </motion.div>
            ))}
            {projects.length === 0 && (
                <div className="col-span-full py-20 text-center text-zinc-400">
                    لا توجد مشاريع حالياً.
                </div>
            )}
        </div>
    </section>
  );
};
