import { Metadata } from 'next';
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { ProjectsContent } from "@/components/layouts/ProjectsContent";

export const metadata: Metadata = {
  title: "معرض المشاريع | الصنعة للمعمار",
  description: "تصفح معرض صور مشاريع الصنعة. شاهد إبداعاتنا في تنفيذ واجهات GRC، ديكورات الجبس، والأسقف المعلقة للفيلات والقصور.",
  keywords: ["معرض المشاريع", "صور ديكور", "مشاريع GRC", "جبسوم بورد", "تشطيبات فيلات"],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-24 text-right">
      <Header />
      <main className="flex-1">
        <ProjectsContent />
      </main>
      <Footer />
    </div>
  );
}
