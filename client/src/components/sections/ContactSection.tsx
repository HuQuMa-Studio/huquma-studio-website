/* =============================================================
   ContactSection — HuQuMa Studio
   Design: Sección de contacto con fondo de materiales de construcción
   - Información de contacto con iconos
   - Links a redes sociales
   - CTA principal de WhatsApp
   ============================================================= */

const CONTACT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/contact_bg-66anXKfdipuCSpRaTqL9ce.webp";

const contactItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "+52 613 122 0058",
    href: "https://wa.me/526131220058/?text=Hello%20World!",
    external: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    label: "Email",
    value: "hugo@huquma.studio",
    href: "mailto:hugo@huquma.studio",
    external: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Loreto, Baja California Sur, México",
    href: "https://maps.google.com/?q=Loreto,Baja+California+Sur,Mexico",
    external: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    label: "Website",
    value: "loreto.com",
    href: "https://loreto.com",
    external: true,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/profile.php?id=100083097284323",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC9lKXLcmQcWI2kj7-JdQhog",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={CONTACT_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.15) saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <div className="reveal">
            <div className="section-number mb-3">05 — Contact</div>
            <span className="gold-line" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight mb-6">
              Let's Build<br />
              <span className="text-[#B8963E] italic">Together</span>
            </h2>
            <p className="text-[#6A6A6A] text-sm leading-relaxed mb-10 max-w-sm">
              Ready to start your project? Whether it's a new build, renovation,
              or consultation, I'm here to help turn your ideas into reality.
              Based in Loreto, serving all of Baja California Sur.
            </p>

            {/* Primary CTA */}
            <a
              href="https://wa.me/526131220058/?text=Hello%20World!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 text-sm py-3 px-6 mb-10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Start a Conversation
            </a>

            {/* Social links */}
            <div>
              <div className="section-number mb-3">Follow the Work</div>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-[#6A6A6A] hover:border-[#B8963E] hover:text-[#B8963E] transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — contact details */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            <div className="space-y-0 divide-y divide-white/5">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 py-6 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/8 text-[#B8963E] group-hover:border-[#B8963E] transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="section-number mb-0.5">{item.label}</div>
                    <div className="text-[#F5F0E8] text-sm group-hover:text-[#D4AF5A] transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Address */}
            <div className="mt-8 p-5 border border-white/5 bg-[#1A1A1A]/50">
              <div className="section-number mb-2">Mailing Address</div>
              <address className="not-italic text-[#6A6A6A] text-sm leading-relaxed">
                Hugo Quintero Maldonado<br />
                Calle Centro SN, Col. Centro<br />
                CP 23880, Loreto<br />
                Baja California Sur, México
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
