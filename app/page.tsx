import { Metadata } from 'next';
import { Header } from "@/components/layouts/Header";
import { Hero } from "@/components/layouts/Hero";
import { Services } from "@/components/layouts/Services";
import { FeaturesCTA } from "@/components/layouts/FeaturesCTA";
import { Footer } from "@/components/layouts/Footer";
import { ReviewsSlider } from "@/components/layouts/ReviewsSlider";
import { PortfolioPreview } from "@/components/layouts/PortfolioPreview";

export const metadata: Metadata = {
  title: "الصنعة | إبداع معماري في الديكور والجبس والـ GRC",
  description: "شركة الصنعة متخصصة في تنفيذ أرقى الديكورات المعمارية، الجبسوم بورد، الأسقف المعلقة، وواجهات GRC و GRB بأعلى مستويات الإتقان.",
  keywords: ["الصنعة", "ديكور", "جبس", "GRC", "تشطيبات", "عمارة"],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        <Services />
        <PortfolioPreview />
        <FeaturesCTA />
        <ReviewsSlider />
      </main>

      <Footer />
    </div>
  );
}
