import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Sparkles,
  Smartphone,
  Scissors,
  Tag,
  Flame,
  Package,
  CalendarClock,
  ShieldCheck,
  Truck,
  MapPin,
  Instagram,
  MessageCircle,
  Wallet,
  Banknote,
  Bitcoin,
  ArrowRight,
  Star,
  CheckCircle2,
  PackageOpen,
  LayoutGrid,
} from "lucide-react";
import logo from "@/assets/images/logo_fixed_1779202163805.png";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "EXPOSTORE | Catálogo Premium en Lanús, Buenos Aires" },
      {
        name: "description",
        content:
          "EXPOSTORE Lanús: perfumes árabes y de diseñador, iPhones originales, Karssell, electrodomésticos, combos y ofertas semanales. Envíos a todo el país.",
      },
    ],
  }),
});

const WHATSAPP_NUMBER = "5491138012403";
const waLink = (productName: string) => {
  const msg = `Hola David! Vi tu catálogo web. Me interesa: ${productName} - Código de seguimiento: EXPOSTORE`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export type Category =
  | "all"
  | "perfumes"
  | "lattafa"
  | "armaf"
  | "afnan"
  | "al-haramain"
  | "al-wataniah"
  | "bharara"
  | "maison-alhambra"
  | "orientica"
  | "rasasi"
  | "rayhaan"
  | "tubbees"
  | "french-avenue"
  | "iphone"
  | "karssell"
  | "electro"
  | "combos";

const MAIN_CATEGORIES: { id: Category; label: string; sub: string; Icon: typeof Sparkles }[] = [
  { id: "perfumes", label: "Perfumes", sub: "Colección Árabe & Designer", Icon: Sparkles },
  { id: "iphone", label: "iPhones", sub: "Apple Original", Icon: Smartphone },
  { id: "karssell", label: "Karssell", sub: "Cuidado capilar", Icon: Scissors },
  { id: "electro", label: "Electro", sub: "Hogar y más", Icon: Flame },
  { id: "combos", label: "Combos", sub: "Ahorro total", Icon: Package },
];

const PERFUME_BRANDS: { id: Category; label: string }[] = [
  { id: "lattafa", label: "Lattafa" },
  { id: "al-haramain", label: "Al Haramain" },
  { id: "rayhaan", label: "Rayhaan" },
  { id: "al-wataniah", label: "Al Wataniah" },
  { id: "armaf", label: "Armaf" },
  { id: "afnan", label: "AFNAN" },
  { id: "maison-alhambra", label: "Maison Alhambra" },
  { id: "bharara", label: "Bharara" },
  { id: "rasasi", label: "Rasasi" },
  { id: "orientica", label: "Orientica" },
  { id: "french-avenue", label: "French Avenue" },
  { id: "tubbees", label: "Tubbees" },
];

function Home() {
  const [active, setActive] = useState<Category>("all");
  const [activeBrand, setActiveBrand] = useState<Category | null>(null);

  const activeCat = useMemo(() => {
    if (active === "all") return null;
    return (
      MAIN_CATEGORIES.find((c) => c.id === active) ||
      PERFUME_BRANDS.find((b) => b.id === active) ||
      null
    );
  }, [active]);

  const filteredProducts = useMemo(() => {
    if (active === "all") return PRODUCTS;
    if (active === "perfumes") {
      if (activeBrand) return PRODUCTS.filter((p) => p.category === activeBrand);
      // If perfumes selected but no brand, show all from all perfume brands
      const brands = PERFUME_BRANDS.map((b) => b.id);
      return PRODUCTS.filter((p) => brands.includes(p.category));
    }
    return PRODUCTS.filter((p) => p.category === active);
  }, [active, activeBrand]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Marquee */}
      <div className="border-b border-border/60 bg-black/60 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2 text-xs sm:text-sm font-semibold tracking-widest text-gold">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 px-6">
              <span className="flex items-center gap-2">
                <Truck className="size-4" /> ENVÍOS A TODO EL PAÍS
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4" /> PRODUCTOS ORIGINALES
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" /> RETIRO EN LANÚS
              </span>
              <span className="flex items-center gap-2">
                <Bitcoin className="size-4" /> ACEPTAMOS USDT
              </span>
              <span className="flex items-center gap-2">
                <Star className="size-4" /> ATENCIÓN PERSONALIZADA
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <div className="rounded-xl bg-white px-3 py-1.5 ring-1 ring-gold/40 group-hover:ring-gold transition shadow-gold">
              <img src={logo} alt="EXPOSTORE" className="h-8 sm:h-10 w-auto object-contain" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-[10px] tracking-[0.3em] text-gold font-semibold">
                LANÚS · BS AS
              </div>
              <div className="text-xs text-muted-foreground">Catálogo Premium</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#top" className="text-sm font-bold hover:text-gold transition-colors">
              Inicio
            </a>
            <a href="#catalogo" className="text-sm font-bold hover:text-gold transition-colors">
              Catálogo
            </a>
          </nav>

          <a
            href={waLink("Consulta general Soporte")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-primary-foreground shadow-gold hover:scale-105 transition"
          >
            <MessageCircle className="size-4" />
            <span>Soporte</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,oklch(0.82_0.16_88/0.25),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs font-semibold tracking-widest text-gold mb-6">
              <Sparkles className="size-3.5" /> CATÁLOGO OFICIAL · LANÚS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.95]">
              BIENVENIDO A<br />
              <span className="text-gradient-gold">EXPOSTORE</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
              Tu tienda multirubro de confianza en Lanús, Buenos Aires. Perfumes, tecnología,
              cuidado personal y mucho más — con la mejor atención y envíos a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm sm:text-base font-bold text-primary-foreground shadow-gold hover:scale-[1.03] transition"
              >
                Explorar catálogo{" "}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </a>
              <a
                href={waLink("Consulta general")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm sm:text-base font-semibold hover:border-gold/60 transition"
              >
                <MessageCircle className="size-4" /> Hablar por WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-gold" /> Stock real
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-gold" /> Garantía oficial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-gold" /> Pago seguro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold font-semibold uppercase">CATEGORÍAS</p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">Elegí tu rubro</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <CategoryChip
            active={active === "all"}
            label="Ver todo"
            sub="Catálogo"
            Icon={LayoutGrid}
            onClick={() => {
              setActive("all");
              setActiveBrand(null);
            }}
          />
          {MAIN_CATEGORIES.map((c) => (
            <CategoryChip
              key={c.id}
              active={active === c.id}
              label={c.label}
              sub={c.sub}
              Icon={c.Icon}
              onClick={() => {
                setActive(c.id);
                if (c.id !== "perfumes") setActiveBrand(null);
              }}
            />
          ))}
        </div>

        {/* Brand Sub-navigation if Perfumes is selected */}
        {active === "perfumes" && (
          <div className="mt-10 animate-fade-up">
            <div className="flex items-center gap-2 mb-4 overflow-hidden">
              <div className="h-px bg-gold/20 flex-1" />
              <p className="text-[10px] tracking-[0.3em] text-gold font-bold uppercase whitespace-nowrap">
                Seleccioná una Marca
              </p>
              <div className="h-px bg-gold/20 flex-1" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveBrand(null)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeBrand === null
                    ? "bg-gold text-primary-foreground border-gold shadow-gold"
                    : "bg-card/40 border-border hover:border-gold/40"
                }`}
              >
                Todas las Marcas
              </button>
              {PERFUME_BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeBrand === brand.id
                      ? "bg-gold text-primary-foreground border-gold shadow-gold"
                      : "bg-card/40 border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {brand.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Catalog / Grid */}
      <section id="catalogo" className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-10">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold font-semibold uppercase">
              {active === "all" ? "Destacados" : activeCat?.label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              {active === "all" ? "Nuestros Productos" : `Categoría: ${activeCat?.label}`}
            </h2>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="relative rounded-3xl border border-gold/30 bg-gradient-card p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-gradient-gold opacity-10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto size-20 rounded-2xl bg-gradient-gold grid place-items-center text-primary-foreground shadow-gold animate-float">
                <PackageOpen className="size-10" />
              </div>
              <h3 className="mt-6 text-2xl sm:text-3xl font-black">
                <span className="text-gradient-gold">Próximamente</span> nuevos ingresos
              </h3>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Estamos renovando el stock de{" "}
                <strong className="text-foreground">{activeCat?.label}</strong>. Escribinos por
                WhatsApp y te avisamos apenas lleguen o te mostramos similares.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={waLink(
                    active === "all" ? "Catálogo completo" : (activeCat?.label ?? "Catálogo"),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground shadow-glow hover:scale-105 transition animate-pulse-gold"
                >
                  <MessageCircle className="size-4" /> Consultar ahora
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 border-t border-border/60">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-gold font-semibold uppercase">
            AYUDA & SOPORTE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">Preguntas Frecuentes</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Despejá tus dudas antes de comprar. Si no encontrás lo que buscás, contactanos.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              q: "¿Cómo realizo una compra?",
              a: "Es simple: elegís el producto en el catálogo, hacés clic en 'Consultar y lo quiero' y te redirige a nuestro WhatsApp para coordinar el pago y envío.",
            },
            {
              q: "¿Hacen envíos a todo el país?",
              a: "Sí, realizamos envíos a toda la Argentina a través de Correo Argentino u OCA. También podés retirar en nuestro punto de entrega en Lanús.",
            },
            {
              q: "¿Cuáles son los medios de pago?",
              a: "Aceptamos Efectivo (con descuento), Transferencia Bancaria, Mercado Pago (dinero en cuenta) y USDT (Cripto).",
            },
            {
              q: "¿Los productos tienen garantía?",
              a: "Sí, todos nuestros productos cuentan con garantía oficial de EXPOSTORE. Los iPhones son originales y sellados con garantía Apple.",
            },
            {
              q: "¿Tienen local físico?",
              a: "Trabajamos como showroom y punto de retiro en Lanús, Buenos Aires. Podés coordinar tu visita para retirar tu compra.",
            },
            {
              q: "¿Venden por mayor?",
              a: "Sí, contamos con precios especiales para revendedores en perfumes y cuidado capilar (Karssell). Consultanos por los packs mayoristas.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-border bg-card/40 hover:border-gold/40 transition group hover:shadow-gold/5"
            >
              <h3 className="font-bold text-gold text-base mb-3 group-hover:translate-x-1 transition-transform">
                {faq.q}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{faq.a}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="border-y border-border/60 bg-gradient-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-gold font-semibold text-center">
            POR QUÉ ELEGIRNOS
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-center mt-2 mb-12">
            La confianza es nuestro sello
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                Icon: Truck,
                title: "Envíos a todo el país",
                desc: "Despachamos en 24/48hs por correo asegurado a toda Argentina.",
              },
              {
                Icon: ShieldCheck,
                title: "Productos originales",
                desc: "100% originales con garantía. iPhones sellados, perfumes auténticos.",
              },
              {
                Icon: MapPin,
                title: "Atención en Lanús",
                desc: "Showroom y retiro personalizado en Lanús, Buenos Aires.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-6 hover-lift overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 size-32 rounded-full bg-gradient-gold opacity-10 blur-2xl group-hover:opacity-20 transition" />
                <div className="size-12 rounded-xl bg-gradient-gold grid place-items-center text-primary-foreground shadow-gold">
                  <f.Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payments */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <p className="text-xs tracking-[0.3em] text-gold font-semibold text-center">
          MÉTODOS DE PAGO
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mt-2 mb-10">
          Pagás como te conviene
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { Icon: Wallet, label: "Mercado Pago" },
            { Icon: Banknote, label: "Efectivo" },
            { Icon: Wallet, label: "Transferencia" },
            { Icon: Bitcoin, label: "USDT · Cripto" },
          ].map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card/60 p-5 flex flex-col items-center justify-center gap-3 hover-lift"
            >
              <div className="size-12 rounded-full bg-gold/10 grid place-items-center text-gold">
                <m.Icon className="size-6" />
              </div>
              <div className="text-sm font-bold tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-primary-foreground">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black">¿Lo querés hoy?</h3>
            <p className="text-sm sm:text-base opacity-80 mt-1">
              Escribinos por WhatsApp y te asesoramos al instante.
            </p>
          </div>
          <a
            href={waLink("Consulta general")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-base font-bold text-gold shadow-elegant hover:scale-105 transition animate-pulse-gold"
          >
            <MessageCircle className="size-5" /> Consultar ahora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-black/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="inline-block rounded-xl bg-white px-3 py-2 ring-1 ring-gold/40">
              <img src={logo} alt="EXPOSTORE" className="h-9 w-auto object-contain" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Catálogo premium en Lanús, Buenos Aires. Perfumes, tecnología y mucho más con
              garantía.
            </p>
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] text-gold font-semibold mb-3">CONTACTO</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-gold" /> Lanús, Buenos Aires
              </li>
              <li>
                <a
                  href={waLink("Consulta general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition"
                >
                  <MessageCircle className="size-4 text-gold" /> +54 9 11 3801-2403
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/expostorelanus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition"
                >
                  <Instagram className="size-4 text-gold" /> @expostorelanus
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] text-gold font-semibold mb-3">CATEGORÍAS</div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => {
                    setActive("all");
                    setActiveBrand(null);
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-gold transition text-left"
                >
                  Ver todo
                </button>
              </li>
              {MAIN_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setActive(c.id);
                      setActiveBrand(null);
                      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-gold transition text-left"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EXPOSTORE · Todos los derechos reservados
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink("Consulta general")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 size-14 rounded-full bg-whatsapp grid place-items-center text-whatsapp-foreground shadow-glow animate-pulse-gold hover:scale-110 transition"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}

function CategoryChip({
  label,
  sub,
  Icon,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  Icon: typeof Sparkles;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl border p-4 sm:p-5 transition overflow-hidden hover-lift
        ${
          active
            ? "border-gold bg-gradient-card shadow-gold"
            : "border-border bg-card/60 hover:border-gold/60"
        }`}
    >
      <div
        className={`absolute -top-8 -right-8 size-24 rounded-full blur-2xl transition
        ${active ? "bg-gradient-gold opacity-30" : "bg-gold/10 opacity-0 group-hover:opacity-30"}`}
      />
      <div
        className={`size-10 rounded-xl grid place-items-center transition
        ${active ? "bg-gradient-gold text-primary-foreground shadow-gold" : "bg-gold/10 text-gold group-hover:bg-gradient-gold group-hover:text-primary-foreground"}`}
      >
        <Icon className="size-5" />
      </div>
      <div className="mt-3 font-bold text-sm sm:text-base leading-tight">{label}</div>
      <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{sub}</div>
    </button>
  );
}
