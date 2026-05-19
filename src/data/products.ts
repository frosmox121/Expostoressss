import { Category } from "@/routes/index";
import pIphone from "@/assets/p-iphone.jpg";
import pCombo from "@/assets/p-combo.jpg";
import pHeater from "@/assets/p-heater.jpg";
import pFanheater from "@/assets/p-fanheater.jpg";

// New Images
import pBadeOud from "@/assets/images/p_bade_oud_1779196572050.png";
import pOilKarseell from "@/assets/images/p_oil_karseell_1779196585542.png";
import pAmberOud from "@/assets/images/p_amber_oud_gold_edition_1779196613926.png";
import pCremaKarseell from "@/assets/images/p_crema_karseell_maca_essence_repair_collagen_hair_mask_500g_1779196627715.png";
import pWolf from "@/assets/images/p_wolf_rayhaan_perfume_bottle_with_embossed_wolf_head_1779196643235.png";
import pKiss from "@/assets/images/p_kiss_rayhaan_perfume_bottle_with_gold_lattice_pattern_1779196659325.png";
import pSabahAlWard from "@/assets/images/p_sabah_al_ward_al_wataniah_perfume_bottle_with_crystal_cap_1779196674639.png";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price?: string;
  image: string;
  description: string;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bade'e Al Oud Amethyst",
    category: "lattafa",
    price: "$55.000",
    image: pBadeOud,
    description:
      "Perfume Lattafa Original. Notas de salida: Manzana, Piña, Bergamota. Corazón: Jazmín, Pachulí, Notas Herbales. Fondo: Vainilla, Ámbar, Almizcle.",
    tag: "Más vendido",
  },
  {
    id: "2",
    name: "Oil Capilar Karseell Maca Essence",
    category: "karssell",
    price: "$22.000",
    image: pOilKarseell,
    description:
      "Reparación intensa y brillo instantáneo. Textura liviana, no deja el pelo grasoso. Pack x6: $14.500 c/u | Pack x12: $13.000 c/u | Pack x24: $12.000 c/u",
    tag: "Mayorista",
  },
  {
    id: "3",
    name: "Al Haramain Amber Oud Gold Edition",
    category: "al-haramain",
    price: "$82.000",
    image: pAmberOud,
    description:
      "Perfume importado árabe de alta gama. Tipo Eau de Parfum. Aroma dulce, frutal y elegante. Súper duradero y con estela potente.",
    tag: "Alta Gama",
  },
  {
    id: "4",
    name: "Crema Capilar Karseell 500g",
    category: "karssell",
    price: "$22.000",
    image: pCremaKarseell,
    description:
      "Hidratación profunda, brillo y reparación desde la primera aplicación. Ideal para cabellos secos o dañados.",
    tag: "Destacado",
  },
  {
    id: "5",
    name: "Rayhaan Wolf",
    category: "rayhaan",
    price: "$79.900",
    image: pWolf,
    description: "Fragancia intensa con carácter. Botella de lujo con relieve de lobo 3D.",
  },
  {
    id: "6",
    name: "Rayhaan Kiss",
    category: "rayhaan",
    price: "$72.000",
    image: pKiss,
    description: "Aroma seductor y sofisticado. Botella con diseño de encaje dorado intrincado.",
  },
  {
    id: "7",
    name: "Sabah Al Ward Al Wataniah",
    category: "al-wataniah",
    price: "$59.900",
    image: pSabahAlWard,
    description: "Elegancia en cada gota. Botella premium con tapa de cristal tallado.",
  },
  {
    id: "8",
    name: "iPhone 15 Pro Max 256GB",
    category: "iphone",
    price: "USD 1.350",
    image: pIphone,
    description: "Titanio natural, sellado en caja con garantía oficial.",
    tag: "Nuevo",
  },
  {
    id: "9",
    name: "Combo Invierno",
    category: "combos",
    price: "$45.000",
    image: pCombo,
    description: "Estufa + Manta para pasar el frío.",
    tag: "Oferta",
  },
];
