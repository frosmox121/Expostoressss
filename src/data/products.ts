const pCombo = "https://images.unsplash.com/photo-1615655096345-61a54750068d?w=600&auto=format&fit=crop&q=80";
const pBadeOud = "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80";
const pOilKarseell = "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=80";
const pCremaKarseell = "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80";
const pWolf = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80";
const pKiss = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80";
const pSabahAlWard = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80";
const pVsBody = "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80";
const pKhamrah = "https://images.unsplash.com/photo-1588405748373-122b2321bc31?w=600&auto=format&fit=crop&q=80";
const pOdysseyCandee = "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80";
const pOdysseyMarshmallow = "https://images.unsplash.com/photo-1615655096345-61a54750068d?w=600&auto=format&fit=crop&q=80";
const pElixirChic = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80";
const pAmberOudFixed = "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop&q=80";
const pFakharTrio = "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80";
const pYaraQuartet = "https://images.unsplash.com/photo-1615655096345-61a54750068d?w=600&auto=format&fit=crop&q=80";
const pAsadAll = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80";
const pKhamrahSeries = "https://images.unsplash.com/photo-1588405748373-122b2321bc31?w=600&auto=format&fit=crop&q=80";
const pEclaire = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80";
const pIphonesLineup = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80";
const pArgShirt = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80";

export interface Product {
  id: string;
  name: string;
  category: "Perfumes" | "Hair Care" | "Fashion" | "Electronics" | "Combos";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  status?: string;
  details?: string[];
}

export const products: Product[] = [
  {
    id: "combo-especial",
    name: "Luxury Glow Combo Pack",
    category: "Combos",
    price: 135.00,
    originalPrice: 165.00,
    rating: 4.9,
    reviewsCount: 142,
    image: pCombo,
    description: "Our signature deluxe pairing combining best-selling Arabian fragrances and hair restoration treatments.",
    inStock: true,
    status: "Best Seller",
    details: ["Includes Bade'e Al Oud 100ml", "Includes Karseell Collagen Mask 500g", "Exquisite packaging ideal for gifting"]
  },
  {
    id: "lattafa-yara-quartet",
    name: "Lattafa Yara Quartet Collection",
    category: "Perfumes",
    price: 110.00,
    originalPrice: 140.00,
    rating: 5.0,
    reviewsCount: 389,
    image: pYaraQuartet,
    description: "The complete viral Yara quartet. Features Yara Pink, Yara Tous (Mango), Yara Moi (Peach), and Yara Roja (Fruity). Deliciously sweet.",
    inStock: true,
    status: "Trending",
    details: ["4 x 100ml Eau de Parfum Bottles", "Sweet, gourmand, tropical, and sensual notes", "Extreme sillage and all-day longevity"]
  },
  {
    id: "bade-oud",
    name: "Lattafa Bade'e Al Oud (Oud for Glory)",
    category: "Perfumes",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.8,
    reviewsCount: 214,
    image: pBadeOud,
    description: "A highly prestigious, warm spicy and woody oud fragrance with masterfully blended lavender, saffron, and patchouli.",
    inStock: true,
    status: "Elite Selection",
    details: ["100ml Eau de Parfum", "Top Notes: Lavender, Saffron, Nutmeg", "Base Notes: Patchouli, Agarwood (Oud)"]
  },
  {
    id: "karseell-collagen-mask",
    name: "Karseell Maca Essence Collagen Hair Mask",
    category: "Hair Care",
    price: 28.00,
    originalPrice: 38.00,
    rating: 4.9,
    reviewsCount: 512,
    image: pCremaKarseell,
    description: "Deep repair conditioning collagen treatment enriched with maca essence. Revitalizes dry, curly, and damaged hair.",
    inStock: true,
    status: "Viral Sensation",
    details: ["500ml net weight", "Intense hydration and split-ends repair", "Safe for color-treated and chemically processed hair"]
  },
  {
    id: "karseell-hair-oil",
    name: "Karseell Maca Essence Restorative Hair Oil",
    category: "Hair Care",
    price: 22.00,
    originalPrice: 30.00,
    rating: 4.7,
    reviewsCount: 184,
    image: pOilKarseell,
    description: "Infused with lightweight nourishing oils to add brilliant glass-like shine, erase frizz, and protect from thermal styling.",
    inStock: true,
    details: ["100ml elegant dropper pump", "Immediate absorption with zero greasy residue", "Protects against UV and high styling heat"]
  },
  {
    id: "lattafa-asad-all",
    name: "Lattafa Asad Black & Gold Duo",
    category: "Perfumes",
    price: 52.00,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 310,
    image: pAsadAll,
    description: "The magnificent Asad duet. Deeply masculine warm vanilla spice paired with modern vibrant gold lavender amber.",
    inStock: true,
    status: "Most Popular",
    details: ["100ml Asad + 100ml Asad Zanzibar", "Exquisite magnetic display packaging", "Top-tier projection ranking"]
  },
  {
    id: "lattafa-khamrah",
    name: "Lattafa Khamrah Premium",
    category: "Perfumes",
    price: 48.00,
    originalPrice: 65.00,
    rating: 4.9,
    reviewsCount: 412,
    image: pKhamrah,
    description: "An incredibly luxurious, sweet spicy gourmand fragrance blending warm cinnamon, dates, praline, and deep vanilla amber.",
    inStock: true,
    status: "Selling Fast",
    details: ["100ml luxurious heavy crystal decanter", "Notes of Cinnamon, Dates, Praline, Tuberose, Amberwood", "Unisex luxury beloved worldwide"]
  },
  {
    id: "lattafa-khamrah-series",
    name: "Khamrah & Khamrah Qahwa Bundle",
    category: "Perfumes",
    price: 85.00,
    originalPrice: 110.00,
    rating: 4.9,
    reviewsCount: 198,
    image: pKhamrahSeries,
    description: "A double thrill of the world's most viral gourmand fragrance including the original Khamrah and the new coffee-infused Qahwa.",
    inStock: true,
    status: "Limited Edition",
    details: ["100ml Khamrah EDP", "100ml Khamrah Qahwa (with cardamon & roasted coffee)", "Double-chamber presentation box"]
  },
  {
    id: "lattafa-eclaire",
    name: "Lattafa Eclaire Eau De Parfum",
    category: "Perfumes",
    price: 50.00,
    originalPrice: 65.00,
    rating: 5.0,
    reviewsCount: 227,
    image: pEclaire,
    description: "A heavenly milky, caramel, and vanilla sweet cloud. Softly laced with honey and musk. The ultimate lactonic fragrance.",
    inStock: true,
    status: "New Arrival",
    details: ["100ml EDP", "Notes: Caramel, Milk, Honey, Vanilla, Musk", "Often compared to high-end niche perfume houses"]
  },
  {
    id: "sabah-al-ward",
    name: "Sabah Al Ward (Al Wataniah)",
    category: "Perfumes",
    price: 38.00,
    originalPrice: 50.00,
    rating: 4.7,
    reviewsCount: 95,
    image: pSabahAlWard,
    description: "A magical floral oriental fragrance highlighting sweet pink pepper, majestic rose, cacao, and warm patchouli.",
    inStock: true,
    details: ["100ml luxury spray bottle with crystal cap", "Sophisticated rose-gourmand silhouette", "Perfect signature daily fragrance"]
  },
  {
    id: "rayhaan-wolf",
    name: "Rayhaan Pacific Wolf",
    category: "Perfumes",
    price: 42.00,
    originalPrice: 55.00,
    rating: 4.6,
    reviewsCount: 118,
    image: pWolf,
    description: "Embossed with a gorgeous silver wolf head, this perfume delivers cooling marine notes, citrus zest, and heavy crystal-clear woods.",
    inStock: true,
    details: ["100ml heavy glass trophy bottle", "Fresh, oceanic, adventurous, and masculine", "Excellent summer and gym profile"]
  },
  {
    id: "rayhaan-kiss",
    name: "Rayhaan Royal Kiss",
    category: "Perfumes",
    price: 42.00,
    originalPrice: 55.00,
    rating: 4.7,
    reviewsCount: 89,
    image: pKiss,
    description: "Encased in an ornate metallic gold lattice pattern, delivering sweet, playful, and mysterious fruity-floral oriental notes.",
    inStock: true,
    details: ["100ml premium bottle", "Sensual red fruits, orange blossom, and amber vanilla", "Unforgettable evening option"]
  },
  {
    id: "victoria-secret-sprays",
    name: "Victoria's Secret Body Mist Luxe",
    category: "Perfumes",
    price: 24.00,
    originalPrice: 32.00,
    rating: 4.8,
    reviewsCount: 256,
    image: pVsBody,
    description: "Hydrating, sweet fine fragrance body mist scent lineup. Instant freshness that lingers with lovely notes.",
    inStock: true,
    details: ["250ml spray bottle", "Light, breezy, and refreshing", "Authentic import with premium atomizer"]
  },
  {
    id: "odyssey-candee",
    name: "Armaf Odyssey Candee",
    category: "Perfumes",
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.5,
    reviewsCount: 76,
    image: pOdysseyCandee,
    description: "Super fun candy-gourmand fragrance in Armaf's signature luxury flask bottle. Rich, sweet, and youthfully modern.",
    inStock: true,
    details: ["80ml Eau de Parfum", "Cotton candy, sweet berry, and spun sugar accords", "Playful bottle design"]
  },
  {
    id: "odyssey-marshmallow",
    name: "Armaf Odyssey Homme Marshmallow",
    category: "Perfumes",
    price: 40.00,
    originalPrice: 50.00,
    rating: 4.6,
    reviewsCount: 81,
    image: pOdysseyMarshmallow,
    description: "Seductive gourmand marshmallow laced with dry amber, warm spice, and vanilla. Irresistibly cozy fragrance.",
    inStock: true,
    details: ["80ml luxury flask EDP", "Rich marshmallow cream, vanilla orchid, toasted notes", "Stellar evening projection"]
  },
  {
    id: "elixir-chic",
    name: "Paris Riviera Elixir Chic",
    category: "Perfumes",
    price: 25.00,
    originalPrice: 35.00,
    rating: 4.4,
    reviewsCount: 62,
    image: pElixirChic,
    description: "Charmingly chic notes of fresh citrus, delicate garden blooms, and soft creamy amber woods.",
    inStock: true,
    details: ["100ml Eau de Toilette", "Affordable everyday luxury scent", "Inspired by French riviera vibes"]
  },
  {
    id: "amber-oud-fixed",
    name: "Al Haramain Amber Oud Edition",
    category: "Perfumes",
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 194,
    image: pAmberOudFixed,
    description: "Gold Edition luxury spray. Powerful rich cedar, pure gold amber, fresh citrus and sweet melon fusion.",
    inStock: false,
    status: "Out of Stock",
    details: ["120ml Luxury Travel flanker", "Niche-tier sillage and 24h performance", "Extremely refined dry down"]
  },
  {
    id: "lattafa-fakhar-trio",
    name: "Lattafa Fakhar Trio Set",
    category: "Perfumes",
    price: 89.00,
    originalPrice: 120.00,
    rating: 4.8,
    reviewsCount: 112,
    image: pFakharTrio,
    description: "Includes Fakhar Men, Fakhar Women, and a premium gold travel spray. Gorgeous design representing Arabian nobility.",
    inStock: true,
    details: ["Fakhar Rose and Fakhar Black Gold", "Spicy, fresh, floral and aromatic profiles", "Presented in a luxury royal box"]
  },
  {
    id: "iphones-lineup",
    name: "iPhone Pro Lineup Upgrade",
    category: "Electronics",
    price: 999.00,
    originalPrice: 1099.00,
    rating: 4.9,
    reviewsCount: 615,
    image: pIphonesLineup,
    description: "The definitive premium smartphone lineup. Stunning surgical titanium design, state-of-the-art camera systems.",
    inStock: true,
    status: "Premium Tech",
    details: ["High-refresh Super Retina XDR screen", "A-series high performance chips", "Unrivaled filmmaking capability"]
  },
  {
    id: "arg-shirt",
    name: "Argentina 3-Star Gold Badge Jersey",
    category: "Fashion",
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.9,
    reviewsCount: 489,
    image: pArgShirt,
    description: "Official authentic Argentina World Cup final jersey, featuring the legendary golden 3-star embroidery and the FIFA Champions chest crest.",
    inStock: true,
    status: "World Cup Special",
    details: ["100% breathable athletic fabric", "Aeroready high moisture-wicking technology", "World Cup Champion official chest badge"]
  }
];
