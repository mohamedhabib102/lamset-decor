'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaSpinner, FaEnvelope, FaUser, FaPhone, FaAt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { getMessages } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

interface Message {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export const ControlMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    const res = await getMessages();
    if (res.success) {
      setMessages(res.data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { 
        method: 'DELETE',
        headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
      });
      
      if (res.ok) {
        toast.success('تم حذف الرسالة بنجاح');
        fetchMessages();
      } else {
        const data = await res.json();
        toast.error('فشل حذف الرسالة: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (err) {
      toast.error('حدث خطأ في الاتصال بالخادم');
    }
  };

  return (
    <div className="space-y-12 text-right p-4 md:p-0" dir="rtl">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-2">رسايل التواصل</h1>
          <p className="text-zinc-400 text-base md:text-lg">إدارة واستلام طلبات العملاء المباشرة.</p>
        </div>
        <div className="bg-[#c5a059]/10 px-6 py-3 rounded-2xl border border-[#c5a059]/20 flex items-center gap-3">
           <span className="text-[#c5a059] font-black text-xl">{messages.length}</span>
           <span className="text-zinc-500 font-bold">رسالة إجمالية</span>
        </div>
      </header>

      {isLoading ? (
        <div className="h-96 flex flex-col items-center justify-center text-[#c5a059] gap-4">
          <FaSpinner className="animate-spin text-5xl" />
          <p className="font-bold text-zinc-400 animate-pulse">جاري جلب الرسائل...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 md:p-10 rounded-[40px] border border-zinc-100 shadow-sm relative group hover:shadow-xl hover:border-[#c5a059]/20 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-10">
                <div className="flex-1 space-y-8">
                  {/* Message Header Info */}
                  <div className="flex flex-wrap gap-4 md:gap-6 items-center flex-row-reverse">
                    <div className="flex items-center gap-3 text-zinc-700 bg-zinc-50 px-5 py-2.5 rounded-2xl text-sm font-black border border-zinc-100">
                       <FaUser className="text-[#c5a059]" />
                       <span>{msg.fullName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-500 bg-zinc-50 px-5 py-2.5 rounded-2xl text-sm font-bold border border-zinc-100">
                       <FaAt className="text-[#c5a059]" />
                       <span className="break-all">{msg.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-500 bg-zinc-50 px-5 py-2.5 rounded-2xl text-sm font-black border border-zinc-100">
                       <FaPhone className="text-[#c5a059]" />
                       <span dir="ltr">{msg.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 mr-auto text-xs font-bold bg-white px-3 py-1 rounded-lg shadow-sm">
                       <span>{new Date(msg.created_at).toLocaleString('ar-EG')}</span>
                       <FaClock className="text-[#c5a059]/50" />
                    </div>
                  </div>
                  
                  {/* Message Body */}
                  <div className="bg-zinc-50/70 p-8 rounded-[35px] border border-zinc-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-bl-[100px]" />
                     <FaEnvelope className="absolute top-6 right-6 text-3xl text-[#c5a059]/10" />
                     <p className="text-zinc-700 leading-relaxed text-xl font-medium whitespace-pre-wrap relative z-10 pr-2">
                        {msg.message}
                     </p>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-6 lg:border-r lg:pr-10 lg:border-zinc-100 pt-6 lg:pt-0 border-t lg:border-t-0">
                  <div className="flex items-center gap-2 text-green-500 bg-green-50 px-4 py-2 rounded-xl text-xs font-black">
                     <FaCheckCircle />
                     <span>رسالة واردة</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="w-16 h-16 bg-red-50 text-red-500 rounded-[22px] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm active:scale-95 group/btn"
                    title="حذف الرسالة"
                  >
                    <FaTrash className="text-xl group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-[50px] text-zinc-300 gap-6 bg-zinc-50/50"
            >
              <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center">
                 <FaEnvelope className="text-5xl opacity-30" />
              </div>
              <div className="text-center">
                <p className="font-black text-2xl text-zinc-400">صندوق الوارد فارغ</p>
                <p className="text-zinc-300 mt-2">لم يتم استلام أي رسائل من العملاء حتى الآن.</p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
