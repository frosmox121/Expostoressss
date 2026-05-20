import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import {
  Search,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Star,
  Trash2,
  Sparkles,
  Check,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react'
import { products, Product } from '../data/products'

export const Route = createFileRoute('/')({
  component: ExpoStoreComponent,
})

interface CartItem {
  product: Product;
  quantity: number;
}

function ExpoStoreComponent() {
  // Search & Category states
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')

  // Cart Drawer & Items
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])

  // Details Modal
  const [activeProduct, setActiveProduct] = React.useState<Product | null>(null)

  // Order Success Modal
  const [checkoutStep, setCheckoutStep] = React.useState<'idle' | 'form' | 'success'>('idle')
  const [promoCode, setPromoCode] = React.useState('')
  const [discountPercent, setDiscountPercent] = React.useState(0)
  const [promoMessage, setPromoMessage] = React.useState('')

  // Checkout Form Details
  const [buyerName, setBuyerName] = React.useState('')
  const [buyerPhone, setBuyerPhone] = React.useState('')
  const [buyerAddress, setBuyerAddress] = React.useState('')
  const [buyerCity, setBuyerCity] = React.useState('')

  // Load cart from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('expo_store_cart')
      if (stored) {
        setCartItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Error loading cart:', e)
    }
  }, [])

  // Save cart to localStorage
  const saveCart = (newItems: CartItem[]) => {
    setCartItems(newItems)
    try {
      localStorage.setItem('expo_store_cart', JSON.stringify(newItems))
    } catch (e) {
      console.error('Error saving cart:', e)
    }
  }

  // Cart operations
  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (!product.inStock) return

    const existing = cartItems.find(item => item.product.id === product.id)
    let updated: CartItem[]
    if (existing) {
      updated = cartItems.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updated = [...cartItems, { product, quantity: 1 }]
    }
    saveCart(updated)

    // Optional toast/action
    setCartOpen(true)
  }

  const updateQuantity = (productId: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta
        return { ...item, quantity: Math.max(1, nextQty) }
      }
      return item
    })
    saveCart(updated)
  }

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter(item => item.product.id !== productId)
    saveCart(updated)
  }

  // Promo code validation
  const applyPromo = () => {
    const clean = promoCode.trim().toUpperCase()
    if (clean === 'EXPO20') {
      setDiscountPercent(20)
      setPromoMessage('¡Cupón EXPO20 aplicado! 20% de descuento.')
    } else if (clean === 'REGALO360') {
      setDiscountPercent(15)
      setPromoMessage('¡Cupón REGALO360 aplicado! 15% de descuento.')
    } else {
      setPromoMessage('Cupón no válido')
    }
  }

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Cart calculation totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const discountAmount = (subtotal * discountPercent) / 100
  const totalAmount = subtotal - discountAmount

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!buyerName || !buyerPhone || !buyerAddress || !buyerCity) {
      alert('Por favor complete todos los datos de envío.')
      return
    }

    // Build WhatsApp Message
    const orderNum = Math.floor(1000 + Math.random() * 9000)
    let messageText = `*PEDIDO EXPO STORE #${orderNum}*\n`
    messageText += `-----------------------------\n`
    messageText += `*Cliente:* ${buyerName}\n`
    messageText += `*Teléfono:* ${buyerPhone}\n`
    messageText += `*Dirección:* ${buyerAddress}, ${buyerCity}\n\n`
    messageText += `*Productos:*\n`
    
    cartItems.forEach(item => {
      messageText += `- ${item.product.name} x${item.quantity} ($${(item.product.price * item.quantity).toFixed(2)})\n`
    })

    if (discountPercent > 0) {
      messageText += `\n*Descuento (${discountPercent}%):* -$${discountAmount.toFixed(2)}`
    }
    messageText += `\n*Total a pagar: $${totalAmount.toFixed(2)}*\n`
    messageText += `-----------------------------\n`
    messageText += `¡Hola! Me gustaría coordinar mi envío y pago.`

    const url = `https://api.whatsapp.com/send?phone=${buyerPhone.replace(/\D/g, '')}&text=${encodeURIComponent(messageText)}`
    
    // Set to success and open link
    setCheckoutStep('success')
    window.open(url, '_blank')
    saveCart([]) // Clear Cart
  }

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-800 bg-slate-50 selection:bg-rose-500 selection:text-white">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand with Majestic Failback */}
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg transform transition-transform hover:rotate-3">
              <span className="text-xl font-black text-rose-500">EX</span>
              {/* Optional background image which falls back seamlessly if not loaded */}
              <img 
                src="/logo_fixed_1779202163805_1779229384372.png" 
                alt="Expo Logo" 
                className="absolute inset-0 h-full w-full object-cover rounded-full pointer-events-none opacity-0 transition-opacity duration-300"
                onLoad={(e) => {
                  (e.currentTarget as HTMLImageElement).classList.remove('opacity-0');
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase sm:block flex flex-col">
                Expo <span className="text-rose-600 font-extrabold sm:inline block">Store</span>
              </h1>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase -mt-1 hidden sm:block">Luxurious Collections</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar perfumes, Karseell, conjuntos..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Cart Trigger Badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] h-5 w-5 font-bold rounded-full flex items-center justify-center animate-bounce shadow">
                  {cartItems.reduce((acc, x) => acc + x.quantity, 0)}
                </span>
              )}
              <span className="text-xs font-bold px-1 hidden lg:block">Ver Carrito</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE CONTAINER SEARCH BAR */}
      <div className="p-4 md:hidden bg-white border-b border-slate-100 flex items-center relative">
        <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Buscar marcas, perfumes arabes..."
          className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* HERO HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-[#101423] to-[#251021] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.12),transparent_45%)]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-extrabold tracking-widest uppercase">
              <Sparkles className="h-4 w-4 text-rose-400 animate-spin" />
              ARABIAN EXQUISITE & BEAUTY
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Fragancias del <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 font-black animate-gradient">Oriente Medio</span> y Cuidado Premium
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
              Descubre las colecciones más virales y distinguidas. Desde la colección Yara de Lattafa, pasando por tratamientos capilares de restauración Karseell Collagen, hasta tecnología y prendas de corte internacional.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#productos" 
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-xl hover:shadow-rose-600/20 transform transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Explorar Catálogo <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex -space-x-3 items-center">
                <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold">5.0 ★</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-rose-600 flex items-center justify-center text-[10px] font-bold">K</div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-amber-500 flex items-center justify-center text-[10px] font-bold">L</div>
                <span className="pl-3 text-xs text-slate-350 font-semibold uppercase tracking-wider">¡+1,200 Ventas Certificadas!</span>
              </div>
            </div>
          </div>

          {/* Quick promotion card banner */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden hover:border-rose-500/20 transition-all">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-rose-600/20 rounded-full blur-2xl" />
              <p className="text-xs font-black text-rose-400 tracking-wider">COMBO ESTRELLA DESCUENTO</p>
              <h3 className="text-2xl font-black mt-1">Luxury Glow Combo Pack</h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                Asombroso dúo estrella. Incluye Lattafa Bade'e Al Oud 100ml junto con el tratamiento de brillo Karseell Maca Essence 500g.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-rose-400 font-extrabold text-2xl">$135.00</span>
                  <span className="text-xs text-slate-400 line-through pl-2">$165.00</span>
                </div>
                <button 
                  onClick={() => {
                    const combo = products.find(p => p.id === 'combo-especial');
                    if (combo) addToCart(combo);
                  }}
                  className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-5 py-2 rounded-2xl text-xs flex items-center gap-1 cursor-pointer transition-colors shadow"
                >
                  Agregar Combo <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY TAG FILTERS */}
      <section className="bg-white border-b border-slate-100 py-4 scrollbar-none sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          {['All', 'Perfumes', 'Hair Care', 'Combos', 'Electronics', 'Fashion'].map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-950 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {category === 'All' ? 'Todos' : category}
              </button>
            )
          })}
        </div>
      </section>

      {/* PRODUCTS DIRECTORY SECTION */}
      <main id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
        
        {/* Results Info and layout switches */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              {selectedCategory === 'All' ? 'Todos los Productos' : selectedCategory}
            </h3>
            <p className="text-sm text-slate-500 font-medium font-mono">Mostrando {filteredProducts.length} artículos</p>
          </div>
          {searchQuery && (
            <div className="text-xs bg-rose-50 border border-rose-100 rounded-lg p-2 flex items-center gap-2 text-rose-700">
              <Search className="h-3.5 w-3.5" />
              Filtrado por: <span className="font-bold">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-xs max-w-xl mx-auto">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">No encontramos resultados</h4>
            <p className="text-slate-500 text-sm mt-2">Intenta cambiar el criterio o borra los filtros de búsqueda.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs px-6 py-2.5 rounded-full uppercase cursor-pointer transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null

              return (
                <div 
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className="group bg-white rounded-3xl border border-slate-100 hover:border-rose-500/20 shadow-xs hover:shadow-xl transition-all duration-350 flex flex-col justify-between overflow-hidden relative cursor-pointer"
                >
                  
                  {/* Absolute Labels */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                    {product.status && (
                      <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow">
                        {product.status}
                      </span>
                    )}
                    {discount && (
                      <span className="bg-rose-600 text-white text-[10px] font-extrabold tracking-wide px-3 py-1 rounded-full uppercase shadow">
                        -{discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Absolute stock label */}
                  {!product.inStock && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xs py-2 text-center text-xs font-black text-rose-600 uppercase tracking-widest shadow-xs z-10">
                      Agotado
                    </div>
                  )}

                  {/* Product Image Section */}
                  <div className="relative aspect-square w-full bg-slate-50/50 flex items-center justify-center overflow-hidden border-b border-slate-100 p-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? 'opacity-40 grayscale-[40%]' : ''}`}
                    />
                  </div>

                  {/* Product Details Section */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
                      <h4 className="font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors text-base line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      
                      {/* Rating details */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-505">
                        <div className="flex items-center text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </div>
                        <span className="font-bold text-slate-800">{product.rating}</span>
                        <span className="text-slate-400 font-medium">({product.reviewsCount} reviews)</span>
                      </div>

                      {/* Pricing and Action btn */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="text-left">
                          <span className="text-xl font-black text-slate-950 font-mono">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through block font-mono -mt-1">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        {product.inStock ? (
                          <button
                            onClick={(e) => addToCart(product, e)}
                            className="bg-slate-100 hover:bg-rose-600 text-slate-900 hover:text-white rounded-2xl p-3 transform transition-all active:scale-90 shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="h-5 w-5" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100 rounded-xl px-2.5 py-1.5 cursor-not-allowed">
                            Agotado
                          </span>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              )
            })}
          </div>
        )}

      </main>

      {/* WHY CHOOSE EXPO STORE HIGHLIGHTS */}
      <section className="bg-white border-t border-b border-slate-100 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="p-4 space-y-3 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h5 className="font-black text-lg text-slate-950">Garantía de Importación</h5>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Todos nuestros perfumes árabes son importados directo de fábrica en los Emiratos Árabes. 100% Auténticos y certificados.
            </p>
          </div>

          <div className="p-4 space-y-3 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Phone className="h-6 w-6" />
            </div>
            <h5 className="font-black text-lg text-slate-950">Asistencia por WhatsApp</h5>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Soporte inmediato y atención personalizada por chat las 24 horas del día para coordinar entregas rápidas.
            </p>
          </div>

          <div className="p-4 space-y-3 flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow">
              <MapPin className="h-6 w-6" />
            </div>
            <h5 className="font-black text-lg text-slate-950">Envíos Rápidos</h5>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Logística coordinada con seguimiento detallado para garantizar la seguridad de tus productos favoritos.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUCT DETAIL MODAL DRAWER */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full relative overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 rounded-full p-2.5 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              <div className="bg-slate-50 p-8 flex items-center justify-center relative min-h-64 md:min-h-auto">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="h-64 object-contain"
                />
              </div>

              <div className="p-8 space-y-5 text-left">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">{activeProduct.category}</span>
                  <h3 className="text-2xl font-black text-slate-950 mt-1 leading-tight">{activeProduct.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-950">${activeProduct.price.toFixed(2)}</span>
                  {activeProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">${activeProduct.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Descripción del Producto</p>
                  <p className="text-sm text-slate-650 leading-relaxed font-medium">
                    {activeProduct.description}
                  </p>
                </div>

                {activeProduct.details && activeProduct.details.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Detalles Clave</p>
                    <ul className="text-xs space-y-1.5 text-slate-600 font-medium">
                      {activeProduct.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex gap-4">
                  {activeProduct.inStock ? (
                    <button
                      onClick={() => {
                        addToCart(activeProduct)
                        setActiveProduct(null)
                      }}
                      className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-2xl flex-1 cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <ShoppingBag className="h-4 w-4" /> Agregar al Carrito
                    </button>
                  ) : (
                    <span className="bg-slate-100 text-slate-400 text-xs font-bold py-3 px-6 rounded-2xl uppercase tracking-wider text-center flex-1 cursor-not-allowed">
                      Agotado para Envío
                    </span>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* CART OVERLAY SLIDE-DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Cart Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-rose-500" />
                <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Tu Bolsa de Compras</h3>
                <span className="bg-slate-100 text-slate-800 text-xs font-bold font-mono px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, x) => acc + x.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={() => {
                  setCartOpen(false)
                  setCheckoutStep('idle')
                }}
                className="hover:bg-slate-100 rounded-full p-2 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Body */}
            {checkoutStep === 'idle' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <p className="text-slate-500 font-bold">Tu carrito está completamente vacío.</p>
                    <p className="text-xs text-slate-400 mt-1">Suma artículos desde nuestra colección árabe.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 border border-slate-950 text-slate-950 hover:bg-slate-50 font-bold text-xs uppercase px-6 py-2.5 rounded-full cursor-pointer transition-all"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start gap-4 border-b border-slate-100 pb-4">
                        
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 p-1">
                            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-extrabold text-sm text-slate-950 line-clamp-1">{item.product.name}</h4>
                            <span className="text-xs font-bold text-slate-500">${item.product.price.toFixed(2)} c/u</span>

                            {/* Qty Adjustment */}
                            <div className="flex items-center gap-2.5 border border-slate-200 bg-slate-100 rounded-full px-2 py-0.5 mt-2 w-max">
                              <button 
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="text-slate-500 hover:text-slate-900 focus:outline-none p-0.5"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-xs font-black font-mono w-4 text-center text-slate-950">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="text-slate-500 hover:text-slate-900 focus:outline-none p-0.5"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 justify-between h-full">
                          <span className="text-sm font-black text-slate-950 font-mono">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>

                      </div>
                    ))}

                    {/* VOUCHER / PROMO */}
                    <div className="bg-slate-50 rounded-2xl p-4 mt-6 text-left">
                      <p className="text-xs font-bold text-slate-500 tracking-wider mb-2">¿TIENES UN CUPÓN DE DESCUENTO?</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ingresa cupón (EXPO20)"
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button
                          onClick={applyPromo}
                          className="bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold px-4 rounded-xl cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      {promoMessage && (
                        <p className={`text-[10px] font-bold mt-2 ${discountPercent > 0 ? 'text-green-600' : 'text-rose-500'}`}>
                          {promoMessage}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-1.5 p-2 bg-rose-50 border border-rose-100 rounded-xl mt-3 text-[10px] font-semibold text-rose-850">
                        <Info className="h-3.5 w-3.5 shrink-0" />
                        <span>Prueba el código <span className="font-bold font-mono text-rose-600">EXPO20</span> para ahorrar un 20%.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Form Step */}
            {checkoutStep === 'form' && (
              <div className="flex-1 overflow-y-auto p-6 text-left">
                <h4 className="text-lg font-black text-slate-950 mb-1">Datos para Coordinar Envío</h4>
                <p className="text-xs text-slate-450 font-medium mb-6">Completa los campos para generar tu orden y coordinar la entrega rápida.</p>
                
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Nombre Completo</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                      placeholder="Juan Pérez"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Número de WhatsApp (con código de país)</label>
                    <input
                      required
                      type="tel"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                      placeholder="e.g. 5491122334455"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Dirección de Entrega</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                      placeholder="Av. Santa Fe 1234, Piso 2"
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Ciudad / Provincia</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none"
                      placeholder="Ciudad Autónoma de Buenos Aires"
                      value={buyerCity}
                      onChange={(e) => setBuyerCity(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase py-4 rounded-xl cursor-pointer text-center mt-6 transition-all shadow-md"
                  >
                    Confirmar Pedido vía WhatsApp
                  </button>
                </form>
              </div>
            )}

            {/* Success Step */}
            {checkoutStep === 'success' && (
              <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-5 text-center">
                <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="h-10 w-10 stroke-[3px]" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">¡Pedido Enviado!</h4>
                <p className="text-sm font-medium text-slate-550 leading-relaxed max-w-sm">
                  Hemos generado tu presupuesto. Te redirigimos a WhatsApp para coordinar tu método de pago preferido, el despacho y el envío rápido.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false)
                    setCheckoutStep('idle')
                  }}
                  className="bg-slate-950 text-white hover:bg-slate-850 text-xs font-black uppercase px-6 py-3 rounded-xl cursor-pointer transition-colors"
                >
                  Volver a la Tienda
                </button>
              </div>
            )}

            {/* Cart Footer */}
            {cartItems.length > 0 && checkoutStep === 'idle' && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="space-y-1.5 font-mono text-left">
                  <div className="flex justify-between text-xs text-slate-500 font-sans font-bold">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-xs text-green-600 font-sans font-bold">
                      <span>Descuento ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-slate-500 font-sans font-bold">
                    <span>Envío:</span>
                    <span className="text-green-600 uppercase font-black font-sans">¡Gratis!</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total estimado:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('form')}
                  className="w-full bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs uppercase py-4 rounded-2xl flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md"
                >
                  Iniciar Coordinación de Envío
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-white font-extrabold text-lg uppercase tracking-wider">EXPO STORE</h4>
            <p className="text-xs text-slate-500">Exclusividad en Perfumería Árabe, Belleza Capilar y Conjuntos Estrella.</p>
          </div>
          <div className="text-center md:text-right space-y-2 text-xs">
            <p className="text-slate-500 font-medium">© 2026 Expo Store International. Reservados todos los derechos.</p>
            <p className="text-slate-600 font-medium font-mono">Hecho con excelencia y pasión.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
