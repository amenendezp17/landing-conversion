import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/data";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#features", label: "Producto" },
  { href: "#pricing", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="flex items-center gap-2 text-white">
          <Logo size={28} />
          <span className="text-lg font-semibold tracking-tight">{PRODUCT_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#cta"
          data-testid="nav-cta"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:scale-105"
        >
          Empieza gratis
        </Link>
      </div>
    </header>
  );
}
