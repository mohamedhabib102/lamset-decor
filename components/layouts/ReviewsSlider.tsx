'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';

interface Rating {
  id: number;
  fullName: string;
  message: string;
}

export const ReviewsSlider = () => {
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/ratings', {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET as string }
        });
        const data = await res.json();
        setReviews(data.data?.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const next = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (isLoading) return (
    <section className="bg-[#0a0a0a] py-24 flex items-center justify-center">
      <FaSpinner className="animate-spin text-[#c5a059] text-4xl" />
    </section>
  );

  if (reviews.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">آراء عملائنا</h2>
          <div className="h-1 w-20 bg-[#c5a059] mx-auto"></div>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="hidden md:flex absolute left-0 md:left-4 z-20 bg-zinc-800/50 hover:bg-[#c5a059] p-4 rounded-full text-white transition-all border border-zinc-700/50"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={next}
            className="hidden md:flex absolute right-0 md:right-4 z-20 bg-zinc-800/50 hover:bg-[#c5a059] p-4 rounded-full text-white transition-all border border-zinc-700/50"
          >
            <FaChevronRight />
          </button>

          <div className="w-full max-w-4xl px-4 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-16 rounded-[30px] md:rounded-[40px] text-center relative"
              >
                <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[#c5a059]/20 text-4xl md:text-6xl opacity-30">
                  <FaQuoteRight />
                </div>
                
                <p className="text-lg md:text-3xl text-zinc-300 leading-relaxed italic mb-8 md:mb-12 relative z-10 px-2">
                   "{reviews[currentIndex]?.message}"
                </p>
                
                <div className="relative z-10">
                  <h4 className="text-xl md:text-3xl font-bold text-white mb-2">{reviews[currentIndex]?.fullName}</h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators and See More */}
        <div className="flex flex-col items-center gap-12 mt-12">
          <div className="flex justify-center gap-3">
            {reviews.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-10 bg-[#c5a059]' : 'w-2 bg-zinc-700'}`}
              />
            ))}
          </div>
          
          <Link 
            href="/reviews" 
            className="text-[#c5a059] font-bold text-sm uppercase tracking-widest border-b-2 border-[#c5a059] pb-1 hover:text-white hover:border-white active:text-white/80 active:border-white/80 transition-all"
          >
            مشاهدة جميع التقييمات
          </Link>
        </div>
      </div>
    </section>
  );
};
