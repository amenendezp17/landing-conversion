import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/data";
import Logo from "./Logo";

const FOOTER_LINKS = [
  { href: "#features", label: "Producto" },
  { href: "#pricing", label: "Precios" },
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Privacidad" },
  { href: "#", label: "Términos" },
  { href: "#", label: "Cookies" },
];

const SOCIALS = [
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-sm text-slate-400 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Logo size={22} />
          <span className="font-semibold">{PRODUCT_NAME}</span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-slate-300">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {SOCIALS.map((social) => (
            <Link key={social.label} href={social.href} className="transition-colors hover:text-slate-300">
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
