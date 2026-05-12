'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaStar, FaSpinner, FaHistory, FaEnvelope } from 'react-icons/fa';
import { getMessages } from '@/lib/supabase';

export const ControlDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, ratings: 0, messages: 0 });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentRatings, setRecentRatings] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [projRes, ratRes, msgRes] = await Promise.all([
          fetch('/api/projects', { headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string } }),
          fetch('/api/ratings', { headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string } }),
          getMessages()
        ]);
        
        const projData = await projRes.json();
        const ratData = await ratRes.json();

        setStats({
          projects: projData.result?.length || 0,
          ratings: ratData.data?.length || 0,
          messages: msgRes.data?.length || 0
        });

        setRecentProjects(projData.result?.slice(-3).reverse() || []);
        setRecentRatings(ratData.data?.slice(-3).reverse() || []);
        setRecentMessages(msgRes.data?.slice(0, 3) || []);

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return (
    <div className="h-96 flex items-center justify-center text-[#c5a059]">
      <FaSpinner className="animate-spin text-5xl" />
    </div>
  );

  return (
    <div className="space-y-12 text-right" dir="rtl">
      <header>
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">مرحباً بك في لوحة التحكم</h1>
        <p className="text-zinc-400 text-lg">إليك ملخص سريع لأحدث النشاطات في موقع الصنعة.</p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 flex items-center justify-between shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
            <FaProjectDiagram />
          </div>
          <div>
            <p className="text-zinc-400 font-bold mb-1">المشاريع</p>
            <h3 className="text-4xl font-bold text-zinc-900">{stats.projects}</h3>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 flex items-center justify-between shadow-sm">
          <div className="w-16 h-16 bg-amber-50 text-[#c5a059] rounded-2xl flex items-center justify-center text-2xl">
            <FaStar />
          </div>
          <div>
            <p className="text-zinc-400 font-bold mb-1">التقييمات</p>
            <h3 className="text-4xl font-bold text-zinc-900">{stats.ratings}</h3>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 flex items-center justify-between shadow-sm">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl">
            <FaEnvelope />
          </div>
          <div>
            <p className="text-zinc-400 font-bold mb-1">الرسائل</p>
            <h3 className="text-4xl font-bold text-zinc-900">{stats.messages}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Recent Projects */}
        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3 justify-end mb-8">
            أحدث المشاريع
            <FaHistory className="text-[#c5a059]" />
          </h3>
          <div className="space-y-4">
            {recentProjects.map((proj: any) => (
              <div key={proj.id} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={proj.url} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="font-bold text-zinc-900 text-sm">{proj.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Ratings */}
        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3 justify-end mb-8">
            آخر التقييمات
            <FaStar className="text-[#c5a059]" />
          </h3>
          <div className="space-y-4">
            {recentRatings.map((rat: any) => (
              <div key={rat.id} className="p-4 bg-zinc-50 rounded-2xl text-right">
                <h4 className="font-bold text-zinc-900 text-sm mb-1">{rat.fullName}</h4>
                <p className="text-xs text-zinc-500 line-clamp-1 italic">"{rat.message}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3 justify-end mb-8">
            آخر الرسائل
            <FaEnvelope className="text-[#c5a059]" />
          </h3>
          <div className="space-y-4">
            {recentMessages.map((msg: any) => (
              <div key={msg.id} className="p-4 bg-zinc-50 rounded-2xl text-right">
                <h4 className="font-bold text-zinc-900 text-sm mb-1">{msg.fullName}</h4>
                <p className="text-xs text-zinc-500 line-clamp-1 italic">"{msg.message}"</p>
              </div>
            ))}
            {recentMessages.length === 0 && <p className="text-center text-zinc-400 py-10">لا يوجد رسائل</p>}
          </div>
        </div>

      </div>
    </div>
  );
};
