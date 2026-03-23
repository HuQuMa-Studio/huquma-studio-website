/* =============================================================
   AboutSection — HuQuMa Studio
   Design: Dos columnas — texto izquierda, retrato derecha
   - Texto de presentación con nombre en negrita
   - Retrato B&W de Hugo
   - Badges de credenciales
   ============================================================= */

const PORTRAIT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/hugo_portrait_1f60c026.jpg";

const credentials = [
  { label: "DRO", desc: "Director Responsable de Obra" },
  { label: "30+", desc: "Años de experiencia" },
  { label: "BCS", desc: "Baja California Sur" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#111111]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text column */}
          <div className="reveal">
            <div className="section-number mb-3">01 — About</div>
            <span className="gold-line" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] mb-8 leading-tight">
              Hugo Quintero<br />
              <span className="text-[#B8963E] italic">Maldonado</span>
            </h2>

            <div className="space-y-5 text-[#A0A0A0] leading-relaxed text-[0.95rem]">
              <p>
                Hi! I'm <strong className="text-[#F5F0E8] font-medium">
                  <span className="text-[#D4AF5A]">Hu</span>go{" "}
                  <span className="text-[#D4AF5A]">Qu</span>intero{" "}
                  <span className="text-[#D4AF5A]">Ma</span>ldonado
                </strong>{" "}
                <strong className="text-[#B8963E]">(HuQuMa)</strong>, a design and build
                professional with 30+ years of experience in residential and commercial
                construction, public works, and real estate development.
              </p>
              <p>
                I'm based in the beautiful coastal town of{" "}
                <strong className="text-[#F5F0E8]">Loreto, Baja California Sur</strong>,
                where I work with integrity, professionalism, and deep respect for our
                community and its values.
              </p>
              <p>
                Whether you're looking for a new custom build from the ground up, an
                addition to your existing property, a complete remodeling project, a pool
                installation, or even a tiny house construction, I can help you design
                and build your ideas into reality.
              </p>
              <p>
                I handle everything from initial architectural design and comprehensive
                engineering solutions to detailed project management and ongoing
                facilities management services — from the earliest stages of
                pre-construction planning all the way through to post-construction
                completion.
              </p>
              <p>
                As a licensed{" "}
                <strong className="text-[#F5F0E8]">
                  Responsible Construction Director (DRO)
                </strong>
                , I can help you properly initiate your construction project and
                successfully decommission your project when complete.
              </p>
              <p>
                I specialize in energy-efficient construction techniques and sustainable
                building practices, and I proudly serve clients throughout{" "}
                <strong className="text-[#F5F0E8]">Baja California Sur</strong>.
              </p>
            </div>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 px-4 py-2.5 border border-white/8 bg-[#1A1A1A]"
                >
                  <span className="font-display text-xl text-[#B8963E] font-semibold leading-none">
                    {c.label}
                  </span>
                  <span className="text-xs text-[#6A6A6A] tracking-wide leading-tight">
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait column */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-3 -right-3 w-full h-full border border-[#B8963E]/20 z-0" />
              <div className="relative z-10 overflow-hidden">
                <img
                  src={PORTRAIT_URL}
                  alt="Hugo Quintero Maldonado — HuQuMa Studio"
                  className="w-full object-cover"
                  style={{
                    aspectRatio: "3/4",
                    objectPosition: "center top",
                    filter: "grayscale(100%) contrast(1.05) brightness(0.95)",
                  }}
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="font-display text-lg text-[#F5F0E8]">Hugo Quintero Maldonado</div>
                  <div className="section-number mt-1">Design + Build + Manage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
