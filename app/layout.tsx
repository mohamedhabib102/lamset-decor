import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { FloatingContact } from "@/components/ui/FloatingContact";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "الصنعة | خبراء الجبس والديكور المعماري وواجهات GRC و GRB",
  description: "الصنعة هي وجهتكم الأولى لتنفيذ أفخم الديكورات الجبسية والواجهات المعمارية الخارجية. نحن متخصصون في تقديم حلول متكاملة تشمل توريد وتركيب الجبسوم بورد بأحدث التصاميم العالمية، وتنفيذ الأسقف المعلقة، وتصميم وتركيب واجهات الـ GRC والـ GRB التي تتميز بمقاومتها الفائقة للظروف الجوية المختلفة. نحرص في كل مشروع على تقديم أدق التفاصيل الهندسية التي تناسب رقي الفيلات والقصور والمشاريع السكنية والتجارية الكبرى. مع الصنعة، نضمن لك جودة خامات لا تضاهى، وفريق عمل محترف، والتزاماً صارماً بمواعيد التسليم لتحويل منزلك إلى تحفة فنية معمارية.",
  keywords: [
    "الصنعة", "أعمال الجبس", "جبس بورد", "واجهات GRC", "واجهات GRB", 
    "ديكورات جبس فخمة", "أسقف معلقة", "مقاول جبس", "تركيب GRC", 
    "تصاميم واجهات كلاسيك", "تشطيب فيلات", "ديكورات داخلية", "بيت نور", 
    "كرانيش جبس يدوية", "جي آر سي", "جي آر بي", "توريد وتركيب ديكورات",
    "تشطيب قصور", "ديكورات جبس مودرن", "معلم جبس", "معلم جبس بورد", "فني جبس محترف"
  ],
  openGraph: {
    title: "الصنعة | إتقان في أعمال الجبس وواجهات GRC و GRB",
    description: "نقدم أفضل حلول الديكور الداخلي والواجهات الخارجية بنظام GRC و GRB بأعلى معايير الجودة والدقة الهندسية.",
    images: [
      {
        url: "/imgs/logo.PNG",
        width: 1200,
        height: 630,
        alt: "الصنعة لأعمال الجبس والواجهات",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "الصنعة | خبراء الجبس وواجهات GRB و GRC",
    images: ["/imgs/logo.PNG"],
  },
  icons: {
    icon: "/imgs/logo.PNG",
  },
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
