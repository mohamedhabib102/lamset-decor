'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaTimes, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { createProject } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface Project {
  id: number;
  title: string;
  name: string;
  url: string;
}

export const ControlProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    setIsSubmitting(true);
    const res = await createProject(title, file);
    
    if (res.success) {
      toast.success('تم إضافة المشروع بنجاح');
      setIsModalOpen(false);
      setTitle('');
      setFile(null);
      fetchProjects();
    } else {
      toast.error('فشل إضافة المشروع: ' + res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { 
        method: 'DELETE',
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success('تم حذف المشروع بنجاح');
        fetchProjects();
      } else {
        toast.error("فشل الحذف: " + data.error);
      }
    } catch (err) {
      toast.error("حدث خطأ في الخادم");
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 text-right p-2 md:p-0" dir="rtl">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 mb-2">إدارة المشاريع</h1>
          <p className="text-zinc-400 text-base md:text-lg">إضافة وحذف المشاريع من معرض الأعمال.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-[#c5a059] hover:bg-[#b08e4a] text-white px-10 h-14 md:h-16 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-[#c5a059]/20 transition-all active:scale-95"
        >
          <FaPlus />
          إضافة مشروع جديد
        </Button>
      </header>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center text-[#c5a059] gap-4">
          <FaSpinner className="animate-spin text-4xl" />
          <p className="text-zinc-400 font-bold">جاري تحميل المعرض...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[35px] overflow-hidden border border-zinc-100 group relative shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-4/3 relative overflow-hidden">
                <img src={project.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="p-6 text-right flex justify-between items-center bg-white border-t border-zinc-50">
                <div>
                   <h3 className="text-lg md:text-xl font-black text-zinc-900 truncate max-w-[200px]">{project.title || project.name}</h3>
                   <p className="text-zinc-400 text-xs mt-1">المعرف الرقمي: {project.id}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#c5a059]" />
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full h-80 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-[50px] text-zinc-300 gap-4 bg-zinc-50/50">
              <FaCloudUploadAlt className="text-5xl opacity-20" />
              <p className="font-bold text-xl">لا يوجد مشاريع معروضة حالياً</p>
            </div>
          )}
        </div>
      )}

      {/* Modal - Improved for Mobile */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"><FaTimes className="text-zinc-400" /></button>
                  <h3 className="text-2xl font-black text-zinc-900">مشروع جديد</h3>
                </div>

                <form className="space-y-8" onSubmit={handleAddProject}>
                  <div className="space-y-2 text-right">
                    <label className="text-sm font-black text-zinc-700">عنوان المشروع</label>
                    <input 
                      type="text" 
                      required 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right font-bold" 
                      placeholder="مثلاً: واجهة فيلا بالتجمع" 
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label className="text-sm font-black text-zinc-700">صورة المشروع</label>
                    <div className="relative h-48 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center group cursor-pointer hover:border-[#c5a059]/50 transition-colors">
                      <input 
                        type="file" 
                        required 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      {file ? (
                        <div className="text-center px-6">
                          <p className="text-[#c5a059] font-black truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-zinc-400 mt-2 font-bold">تم اختيار الصورة بنجاح</p>
                        </div>
                      ) : (
                        <>
                          <FaCloudUploadAlt className="text-4xl text-zinc-300 mb-4 group-hover:text-[#c5a059] transition-colors" />
                          <p className="text-zinc-400 font-bold px-4 text-center">اسحب الصورة هنا أو انقر للاختيار</p>
                        </>
                      )}
                    </div>
                  </div>

                  <Button 
                    disabled={isSubmitting}
                    className="w-full bg-[#c5a059] hover:bg-[#b08e4a] text-white h-16 rounded-[22px] font-black transition-all shadow-xl shadow-[#c5a059]/20 text-lg flex items-center gap-3 justify-center"
                  >
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : null}
                    {isSubmitting ? 'جاري الرفع الآن...' : 'حفظ ونشر المشروع'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
