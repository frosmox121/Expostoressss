import { MessageCircle, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";

const WHATSAPP_NUMBER = "5491138012403";
const waLink = (productName: string) => {
  const msg = `Hola David! Vi tu catálogo web. Me interesa: ${productName} - Código de seguimiento: EXPOSTORE`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-4 hover-lift overflow-hidden">
      <div className="absolute -top-10 -right-10 size-32 rounded-full bg-gradient-gold opacity-10 blur-2xl group-hover:opacity-20 transition" />

      {product.tag && (
        <div className="absolute top-6 right-6 z-10 px-2 py-1 rounded-md text-[10px] font-black tracking-widest bg-gold text-primary-foreground shadow-glow">
          {product.tag.toUpperCase()}
        </div>
      )}

      <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4 border border-border/40">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-lg leading-tight group-hover:text-gold transition">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          <div className="text-xl font-black text-gradient-gold">
            {product.price || "Contactar"}
          </div>
          <a
            href={waLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-full bg-whatsapp grid place-items-center text-whatsapp-foreground shadow-glow hover:scale-110 transition"
          >
            <MessageCircle className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
