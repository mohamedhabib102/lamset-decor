import { Metadata } from 'next';
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { AboutContent } from "@/components/layouts/AboutContent";

export const metadata: Metadata = {
  title: "عن الصنعة | خبراء الديكور المعماري والجبس",
  description: "تعرف على شركة الصنعة، الرائدة في تنفيذ أعمال الجبس، الأسقف المعلقة، وواجهات GRC و GRB بأعلى مستويات الجودة والإتقان الهندسي.",
  keywords: ["الصنعة", "ديكورات جبس", "واجهات GRC", "أسقف معلقة", "تصميم معماري"],
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      <Header />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
