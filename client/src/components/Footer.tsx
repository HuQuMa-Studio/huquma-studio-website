/* =============================================================
   Footer — HuQuMa Studio
   Design: Footer minimalista con logo, copyright y redes sociales
   ============================================================= */

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/logo_956d778e.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="HuQuMa Studio"
              className="w-10 h-10 object-contain opacity-70"
            />
            <div>
              <div className="font-display text-base text-[#F5F0E8] leading-none">
                HuQuMa Studio
              </div>
              <div className="text-[9px] tracking-[0.25em] text-[#B8963E] uppercase font-mono-custom mt-0.5">
                Design + Build + Manage
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-xs text-[#4A4A4A] hover:text-[#B8963E] transition-colors tracking-wide uppercase font-mono-custom"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://web.facebook.com/profile.php?id=100083097284323"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center text-[#4A4A4A] hover:text-[#B8963E] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UC9lKXLcmQcWI2kj7-JdQhog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 flex items-center justify-center text-[#4A4A4A] hover:text-[#B8963E] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[#3A3A3A] text-xs font-mono-custom tracking-wide">
            © 2026 HuQuMa Studio [Design+Build]. All rights reserved.
          </p>
          <p className="text-[#3A3A3A] text-xs font-mono-custom tracking-wide">
            Designed & Made in Mexico with ♥ by{" "}
            <a
              href="https://www.loreto.com/hq/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8963E] hover:underline transition-colors"
            >
              HuQuMa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
