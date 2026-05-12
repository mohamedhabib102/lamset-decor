'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope, FaSpinner } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { createMessage } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const ContactContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. التحقق من الحقول
    if (!formData.fullName || !formData.phone || !formData.message) {
      toast.error('يرجى ملء جميع الحقول الأساسية');
      return;
    }

    if (!formData.phone.match(/^[0-9+]+$/)) {
      toast.error('يرجى إدخال رقم هاتف صحيح (أرقام فقط)');
      return;
    }

    // 2. التحقق من الكود السري للدخول للوحة التحكم
    if (formData.message === process.env.NEXT_PUBLIC_UNIK_KEY) {
      document.cookie = "is_admin=true; path=/; max-age=86400"; // صالح لمدة يوم
      toast.success('مرحباً بك أيها المدير!');
      router.push('/control');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createMessage(formData);
      if (res.success) {
        toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        toast.error('فشل إرسال الرسالة، يرجى المحاولة مرة أخرى');
      }
    } catch (err) {
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6"
          >
            تواصل معنا
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-2xl mx-auto"
          >
            نحن هنا للإجابة على استفساراتكم وتحويل أفكاركم إلى واقع ملموس. لا تتردد في التواصل معنا عبر أي من الوسائل التالية.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-50 p-8 rounded-3xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-sm font-bold text-zinc-700">الاسم</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right" 
                    placeholder="اسمك بالكامل" 
                  />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-sm font-bold text-zinc-700">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right" 
                    placeholder="01xxxxxxxxx" 
                  />
                </div>
              </div>
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-zinc-700">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right" 
                  placeholder="example@mail.com" 
                />
              </div>
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-zinc-700">الرسالة</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-right" 
                  placeholder="كيف يمكننا مساعدتك؟" 
                />
              </div>
              <Button 
                disabled={isSubmitting}
                className="w-full bg-[#c5a059] hover:bg-[#b08e4a] text-white h-14 rounded-xl font-bold transition-all shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <FaSpinner className="animate-spin" /> : 'إرسال الرسالة'}
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-right"
          >
            <div className="flex flex-row-reverse items-start gap-6">
              <div className="bg-[#c5a059]/10 p-4 rounded-2xl">
                <FaWhatsapp className="text-[#c5a059] text-2xl" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">واتساب</h4>
                <p className="text-zinc-500 mb-4 text-lg">تواصل سريع ومباشر لمناقشة التفاصيل</p>
                <a href="https://wa.me/+201027227796" className="text-[#c5a059] font-bold text-lg hover:underline underline-offset-4">+20 102 722 7796</a>
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-6">
              <div className="bg-[#c5a059]/10 p-4 rounded-2xl">
                <FaPhone className="text-[#c5a059] text-2xl" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">اتصال هاتفي</h4>
                <p className="text-zinc-500 mb-4 text-lg">نحن متاحون للرد على اتصالاتكم</p>
                <a href="tel:+201027227796" className="text-[#c5a059] font-bold text-lg hover:underline underline-offset-4">+20 102 722 7796</a>
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-6">
              <div className="bg-[#c5a059]/10 p-4 rounded-2xl">
                <FaEnvelope className="text-[#c5a059] text-2xl" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">البريد الإلكتروني</h4>
                <p className="text-zinc-500 mb-4 text-lg">راسلنا بطلبك أو استفسارك</p>
                <a href="mailto:info@elsanaa.com" className="text-[#c5a059] font-bold text-lg hover:underline underline-offset-4">info@elsanaa.com</a>
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-6">
              <div className="bg-[#c5a059]/10 p-4 rounded-2xl">
                <FaMapMarkerAlt className="text-[#c5a059] text-2xl" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">المقر الرئيسي</h4>
                <p className="text-zinc-500 text-lg">القاهرة، جمهورية مصر العربية</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
