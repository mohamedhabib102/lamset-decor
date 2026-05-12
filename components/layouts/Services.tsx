'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MdArchitecture, MdRoofing, MdOutlineConstruction, MdFormatPaint, MdDashboardCustomize, MdSettingsInputComponent } from 'react-icons/md';

const services = [
  {
    title: "واجهات GRC",
    description: "تركيب واجهات خارجية مقاومة للرطوبة والحرارة بتصاميم كلاسيكية وأعمدة وتيجان فاخرة.",
    icon: <MdArchitecture className="w-10 h-10" />,
    color: "bg-[#c5a059]/5"
  },
  {
    title: "أسقف جبسم بورد",
    description: "تنفيذ أحدث تصاميم الأسقف المعلقة مع بيت نور وديكورات إضاءة مخفية عصرية.",
    icon: <MdRoofing className="w-10 h-10" />,
    color: "bg-zinc-50"
  },
  {
    title: "ديكورات GRB",
    description: "استخدام خامات GRB القوية في تنفيذ القواطع والديكورات التي تتطلب متانة عالية.",
    icon: <MdOutlineConstruction className="w-10 h-10" />,
    color: "bg-[#c5a059]/5"
  },
  {
    title: "ديكورات فلل داخلية",
    description: "تشطيبات جبسية كاملة للمجالس والصالات بلمسة فنية فخمة تناسب القصور والفيلات.",
    icon: <MdFormatPaint className="w-10 h-10" />,
    color: "bg-zinc-50"
  },
  {
    title: "قواطع مكتبية",
    description: "تنفيذ جدران وقواطع جبسية لعزل المكاتب والغرف بسرعة ودقة في التشطيب النهائي.",
    icon: <MdDashboardCustomize className="w-10 h-10" />,
    color: "bg-[#c5a059]/5"
  },
  {
    title: "كرانيش يدوية",
    description: "صناعة وتركيب كرانيش يدوية كلاسيكية تضفي جمالاً معمارياً خاصاً على زوايا الأسقف.",
    icon: <MdSettingsInputComponent className="w-10 h-10" />,
    color: "bg-zinc-50"
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#c5a059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-right mb-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-end gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-[#c5a059]" />
            <span className="text-sm font-black text-[#c5a059] uppercase tracking-widest">خدماتنا المتخصصة</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight"
          >
            حلول الجبس والـ GRC <br /> <span className="text-zinc-400">بمعايير عالمية</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white p-10 border border-zinc-100 hover:border-[#c5a059]/30 active:border-[#c5a059]/60 transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[40px] overflow-hidden cursor-pointer"
            >
              {/* Card Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} rounded-bl-[100px] -z-10 group-hover:scale-150 group-active:scale-150 transition-transform duration-700`} />
              
              <div className="flex flex-col items-end text-right">
                <div className="mb-8 h-16 w-16 flex items-center justify-center text-zinc-900 bg-white shadow-lg rounded-2xl group-hover:bg-[#c5a059] group-hover:text-white group-active:bg-[#c5a059] group-active:text-white transition-colors duration-500">
                   {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{service.title}</h3>
                <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500">
                  <span>اكتشف المزيد</span>
                  <div className="w-6 h-[2px] bg-[#c5a059]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
