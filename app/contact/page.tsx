import { Metadata } from 'next';
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { ContactContent } from "@/components/layouts/ContactContent";

export const metadata: Metadata = {
  title: "اتصل بنا | الصنعة للمعمار",
  description: "تواصل مع فريق الصنعة لمناقشة مشروعك القادم. نحن متخصصون في ديكورات الجبس وواجهات GRC. متاحون عبر واتساب والهاتف والبريد الإلكتروني.",
  keywords: ["اتصل بنا", "رقم الصنعة", "واتساب الصنعة", "تشطيبات", "ديكور"],
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      <Header />
      <main className="flex-1">
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
