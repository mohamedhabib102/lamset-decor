'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaSpinner, FaQuoteRight, FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Rating {
  id: number;
  fullName: string;
  message: string;
  created_at: string;
}

export const ControlRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRatings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ratings', {
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
      });
      const data = await res.json();
      setRatings(data.data || []);
    } catch (err) {
      console.error("Failed to fetch ratings", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم؟")) return;

    try {
      const res = await fetch(`/api/ratings/${id}`, { 
        method: 'DELETE',
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
      });
      if (res.ok) {
        toast.success('تم حذف التقييم بنجاح');
        fetchRatings();
      } else {
        toast.error("فشل حذف التقييم");
      }
    } catch (err) {
      toast.error("حدث خطأ في الخادم");
    }
  };

  return (
    <div className="space-y-12" dir="rtl">
      <header className="text-right">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">إدارة التقييمات</h1>
        <p className="text-zinc-400 text-lg">مراجعة وحذف آراء العملاء المعروضة في الموقع.</p>
      </header>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-zinc-300">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ratings.map((rating, index) => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm relative group transition-all hover:shadow-md"
            >
              <div className="text-[#c5a059]/20 text-4xl mb-6 flex justify-between items-center flex-row-reverse">
                <FaQuoteRight />
                <button 
                  onClick={() => handleDelete(rating.id)}
                  className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                  title="حذف التقييم"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>

              <p className="text-zinc-600 text-lg leading-relaxed mb-8 text-right italic">
                "{rating.message}"
              </p>

              <div className="border-t border-zinc-50 pt-6">
                <div className="text-right">
                  <h4 className="font-bold text-zinc-900">{rating.fullName}</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {new Date(rating.created_at).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {ratings.length === 0 && (
            <div className="col-span-full h-64 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-[40px] text-zinc-400">
              لا توجد تقييمات حالياً في الموقع.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
