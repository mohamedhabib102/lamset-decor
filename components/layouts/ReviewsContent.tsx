'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaQuoteRight, FaTimes, FaSpinner } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface Rating {
  id: number;
  fullName: string;
  message: string;
  created_at: string;
}

export const ReviewsContent = () => {
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ratings', {
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
      });
      const data = await res.json();
      setReviews(data.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string
        },
        body: JSON.stringify({ fullName: name, message }),
      });
      if (res.ok) {
        toast.success('شكرًا لتقييمك! تم النشر بنجاح');
        setIsModalOpen(false);
        setName('');
        setMessage('');
        fetchReviews();
      } else {
        toast.error("فشل إضافة التقييم");
      }
    } catch (err) {
      toast.error("حدث خطأ ما");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center text-[#c5a059]">
      <FaSpinner className="animate-spin text-5xl" />
    </div>
  );

  return (
    <section className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-24 text-right">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#c5a059] hover:bg-[#b08e4a] text-white px-10 h-16 rounded-full font-bold flex items-center gap-3 text-lg shadow-xl shadow-[#c5a059]/20 transition-all active:scale-95"
            >
              <FaPlus className="text-sm" />
              قم بإضافة تقييم
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6">آراء العملاء</h1>
            <p className="text-zinc-500 text-xl max-w-2xl leading-relaxed">نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل ما لدينا في كل مشروع.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-50 p-10 rounded-[40px] relative border border-zinc-100 hover:border-[#c5a059]/30 active:border-[#c5a059]/60 transition-all group cursor-pointer"
            >
              <div className="text-[#c5a059]/20 text-5xl mb-8 group-hover:text-[#c5a059]/40 group-active:text-[#c5a059]/40 transition-colors">
                <FaQuoteRight />
              </div>
              <p className="text-zinc-600 text-lg leading-relaxed mb-10 text-right italic">
                "{review.message}"
              </p>
              <div className="flex justify-between items-center border-t border-zinc-200 pt-8">
                <span className="text-zinc-400 text-sm font-bold tracking-widest">
                  {new Date(review.created_at).toLocaleDateString('ar-EG')}
                </span>
                <h4 className="text-xl font-bold text-zinc-900">{review.fullName}</h4>
              </div>
            </motion.div>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-full py-20 text-center text-zinc-400">
               لا يوجد تقييمات حالياً. كن أول من يضيف تقييماً!
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
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
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
                  >
                    <FaTimes className="text-zinc-400" />
                  </button>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 text-right">إضافة تقييم جديد</h3>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-2 text-right">
                    <label className="text-sm font-bold text-zinc-700">الاسم</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right" 
                      placeholder="اسمك الكريم" 
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label className="text-sm font-bold text-zinc-700">التقييم</label>
                    <textarea 
                      rows={5} 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right resize-none" 
                      placeholder="اكتب تجربتك معنا هنا..." 
                    />
                  </div>

                  <Button 
                    disabled={isSubmitting}
                    className="w-full bg-[#c5a059] hover:bg-[#b08e4a] text-white h-16 rounded-2xl font-bold transition-all shadow-xl shadow-[#c5a059]/20 text-lg flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : null}
                    {isSubmitting ? 'جاري النشر...' : 'نشر التقييم'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
