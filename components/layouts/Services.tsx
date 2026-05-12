'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MdArchitecture, MdRoofing, MdOutlineConstruction, MdFormatPaint, MdDashboardCustomize, MdSettingsInputComponent } from 'react-icons/md';

const services = [
  {
    title: "واجهات GRC",
    description: "تركيب واجهات خارجية مقاومة للرطوبة والحرارة بتصاميم كلاسيكية وأعمدة وتيجان فاخرة.",
    icon: <MdArchitecture className="w-8 h-8" />
  },
  {
    title: "أسقف جبسم بورد",
    description: "تنفيذ أحدث تصاميم الأسقف المعلقة مع بيت نور وديكورات إضاءة مخفية عصرية.",
    icon: <MdRoofing className="w-8 h-8" />
  },
  {
    title: "ديكورات GRB",
    description: "استخدام خامات GRB القوية في تنفيذ القواطع والديكورات التي تتطلب متانة عالية.",
    icon: <MdOutlineConstruction className="w-8 h-8" />
  },
  {
    title: "ديكورات فلل داخلية",
    description: "تشطيبات جبسية كاملة للمجالس والصالات بلمسة فنية فخمة تناسب القصور والفيلات.",
    icon: <MdFormatPaint className="w-8 h-8" />
  },
  {
    title: "قواطع مكتبية",
    description: "تنفيذ جدران وقواطع جبسية لعزل المكاتب والغرف بسرعة ودقة في التشطيب النهائي.",
    icon: <MdDashboardCustomize className="w-8 h-8" />
  },
  {
    title: "كرانيش يدوية",
    description: "صناعة وتركيب كرانيش يدوية كلاسيكية تضفي جمالاً معمارياً خاصاً على زوايا الأسقف.",
    icon: <MdSettingsInputComponent className="w-8 h-8" />
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-zinc-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-primary uppercase tracking-widest mb-3"
          >
            خدماتنا المتخصصة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-zinc-900 sm:text-5xl tracking-tight"
          >
            حلول الجبس والـ GRC المتكاملة
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white p-8 border border-zinc-100 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl text-center rounded-2xl"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 h-12 w-12 flex items-center justify-center text-primary">
                   {service.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{service.title}</h3>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="w-10 h-1 bg-primary/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
