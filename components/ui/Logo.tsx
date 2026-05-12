
import Link from 'next/link';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={`flex flex-col items-center group ${className}`}>
      <span className="text-xl md:text-2xl font-serif tracking-[0.3em] text-[#c5a059] font-light leading-none">
        EL SANAA
      </span>
    </Link>
  );
};
