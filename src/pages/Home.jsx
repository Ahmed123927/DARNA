// src/pages/Home.jsx
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, Zap, Star, Truck, RotateCcw, Shield, Award, Sparkles, ChevronDown, Crown, ShoppingBag, Heart, Eye } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import { useState, useEffect, useRef } from 'react'

// ========== ANIMATED COUNTER COMPONENT ==========
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/[^0-9]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = num / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  const numPart = target.replace(/[0-9]/g, '')
  return <span ref={ref}>{count}{numPart}{suffix}</span>
}

// ========== FLOATING PARTICLES ==========
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brown/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.6, 0.3, 0.7, 0],
            scale: [0.5, 1, 0.8, 1.2, 0.5],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

// ========== ANIMATION VARIANTS ==========
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: -3 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
}

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(189, 135, 73, 0.0)',
      '0 0 40px rgba(189, 135, 73, 0.3)',
      '0 0 20px rgba(189, 135, 73, 0.0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeProduct, setActiveProduct] = useState(0)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const marqueeY = useTransform(scrollYProgress, [0, 1], [0, 50])

  const featuredProducts = products.slice(0, 6)
  const showcaseProducts = [...products, ...products].slice(0, 8)

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate hero product preview
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % Math.min(products.length, 4))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const trustFeatures = [
    { icon: Truck, title: isArabic ? 'شحن مجاني' : 'Free Shipping', desc: isArabic ? 'للطلبات فوق 500 جنيه' : 'On orders over 500 EGP' },
    { icon: RotateCcw, title: isArabic ? 'إرجاع سهل' : 'Easy Returns', desc: isArabic ? '30 يوم للإرجاع' : '30-day return policy' },
    { icon: Shield, title: isArabic ? 'دفع آمن' : 'Secure Payment', desc: isArabic ? 'بيانات محمية 100%' : '100% protected data' },
    { icon: Award, title: isArabic ? 'جودة مميزة' : 'Premium Quality', desc: isArabic ? 'منتجات أصلية مضمونة' : 'Guaranteed authentic' },
  ]

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        
        {/* === FULL-BLEED HERO BACKGROUND IMAGE === */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.15]) }}
        >
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=85" 
            alt="" 
            className="w-full h-full object-cover"
            style={{ animation: 'heroZoom 20s ease-in-out infinite alternate' }}
          />
        </motion.div>

        {/* Multi-layer color overlays for depth + readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0c06]/70 via-[#1a1d0f]/60 to-[#0a0c06]/90"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0c06]/80 via-transparent to-[#0a0c06]/40"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-brown/[0.08] via-transparent to-transparent"></div>
        
        {/* === BACKGROUND EFFECTS === */}
        <div className="relative z-[2]">
          {/* Particles rendered inside this z-layer */}
        </div>
        <FloatingParticles />
        
        {/* Grain */}
        <div className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none animate-grain"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Mouse glow */}
        <motion.div className="absolute inset-0 pointer-events-none opacity-30 hidden sm:block"
          style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(189, 135, 73, 0.3), transparent 55%)` }}
        />

        {/* Animated light beams */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-brown/50 via-transparent to-brown/50"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-brown/50 via-transparent to-brown/50"></div>
          <div className="absolute top-0 left-0 w-full h-full rotate-45">
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-brown/30 via-transparent to-brown/30"></div>
          </div>
        </motion.div>

        {/* Pulsing rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
          {[200, 350, 500].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-brown/[0.04]"
              style={{ width: size, height: size, top: -size/2, left: -size/2 }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Large glowing orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brown/[0.06] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-brown/[0.04] rounded-full blur-[140px]"
        />

        {/* === HERO CONTENT === */}
        <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* LEFT SIDE — Text */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ y: heroTextY, opacity: heroOpacity }}>
              
              {/* Animated badge */}
              <motion.div variants={fadeInUp}>
                <motion.div 
                  animate={{ borderColor: ['rgba(189,135,73,0.2)', 'rgba(189,135,73,0.5)', 'rgba(189,135,73,0.2)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-2 bg-brown/10 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 border cursor-default"
                >
                  <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                    <Sparkles className="text-brown w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.div>
                  <span className="text-[10px] sm:text-xs font-bold text-brown/90 uppercase tracking-[0.2em]">
                    {isArabic ? 'مجموعة 2026 الفاخرة' : 'Premium Collection 2026'}
                  </span>
                </motion.div>
              </motion.div>

              {/* Big heading — letter by letter reveal */}
              <motion.div variants={fadeInUp}>
                <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-7xl xl:text-[5.5rem] font-black text-white mb-5 sm:mb-7 leading-[1.02] tracking-tight">
                  <span className="block overflow-hidden">
                    <motion.span className="block" initial={{ y: '110%', rotateX: -80 }} animate={{ y: 0, rotateX: 0 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                      {isArabic ? 'اكتشف عالم' : 'Discover'}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span className="block text-gradient" initial={{ y: '110%', rotateX: -80 }} animate={{ y: 0, rotateX: 0 }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                      DARNA
                    </motion.span>
                  </span>
                </h1>
              </motion.div>
              
              {/* Subtitle with typewriter-ish fade */}
              <motion.p variants={fadeInUp}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 mb-8 sm:mb-10 leading-relaxed max-w-md font-light">
                {isArabic 
                  ? 'رحلة تسوق استثنائية مع تشكيلة فاخرة من المنتجات المختارة بعناية'
                  : 'An exceptional shopping journey with a luxurious selection of carefully curated products'}
              </motion.p>

              {/* CTAs — with pulse */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14">
                <motion.div {...glowPulse}>
                  <Link to="/products"
                    className="group relative bg-gradient-to-r from-brown via-[#d4a574] to-brown bg-[length:200%_auto] hover:bg-right text-white px-8 sm:px-11 py-4 sm:py-[18px] rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-3 overflow-hidden transition-all duration-700 hover:scale-[1.05] shadow-lg shadow-brown/25">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="relative">
                      <ShoppingBag size={16} className="inline mr-1.5 sm:mr-2" />
                    </motion.span>
                    <span className="relative">{t('shopNow')}</span>
                    <ArrowRight className="relative group-hover:translate-x-2 transition-transform duration-300" size={16} />
                  </Link>
                </motion.div>
                <Link to="/categories"
                  className="group bg-white/[0.06] backdrop-blur-md text-white px-8 sm:px-11 py-4 sm:py-[18px] rounded-full text-sm sm:text-base font-bold hover:bg-white/[0.14] transition-all duration-500 border border-white/[0.1] text-center hover:border-brown/40 hover:scale-[1.03]">
                  {t('exploreCategories')}
                </Link>
              </motion.div>

              {/* Stats — animated counters with dividers */}
              <motion.div variants={fadeInUp} className="flex items-center gap-0">
                {[
                  { value: '500', suffix: '+', label: isArabic ? 'منتج' : 'Products' },
                  { value: '50', suffix: 'K+', label: isArabic ? 'عميل' : 'Customers' },
                  { value: '4.9', suffix: '★', label: isArabic ? 'تقييم' : 'Rating' },
                ].map((stat, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1, y: -3 }}
                    className={`text-center flex-1 py-3 ${i !== 2 ? 'border-r border-white/10' : ''}`}>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gradient mb-0.5">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-white/35 font-semibold uppercase tracking-[0.15em]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE — Interactive product showcase */}
            <motion.div variants={scaleIn} initial="hidden" animate="visible" style={{ y: heroImageY }}
              className="relative hidden lg:block">
              <div className="relative">
                {/* Glow behind */}
                <motion.div 
                  animate={{ scale: [0.9, 1, 0.9], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-brown rounded-[2rem] blur-[80px]"
                />
                
                {/* Main Image with auto-rotating products */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProduct}
                      src={products[activeProduct].image}
                      alt="Featured product"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c06]/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-brown/5 via-transparent to-transparent"></div>
                  
                  {/* Product info overlay at bottom */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute bottom-5 left-5 right-5"
                    >
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">
                        {isArabic ? 'المنتج المميز' : 'Featured Product'}
                      </p>
                      <h3 className="text-white text-lg font-bold mb-1">
                        {isArabic ? products[activeProduct].nameAr : products[activeProduct].name}
                      </h3>
                      <p className="text-brown text-xl font-black">{products[activeProduct].price} {t('egp')}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress dots */}
                  <div className="absolute top-5 right-5 flex gap-1.5">
                    {products.slice(0, 4).map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setActiveProduct(i)}
                        className={`rounded-full transition-all duration-500 ${i === activeProduct ? 'bg-brown w-6 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/60'}`}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Badge — Flash Sale */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-5 -right-5 lg:-top-6 lg:-right-6 z-20">
                  <motion.div animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gradient-to-br from-brown to-[#a67340] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-brown/40 border border-white/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2.5">
                      <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        className="bg-white/20 p-1.5 rounded-lg">
                        <Zap className="text-white w-4 h-4" fill="white" />
                      </motion.div>
                      <div>
                        <div className="text-[8px] font-bold opacity-70 uppercase tracking-[0.15em]">{isArabic ? 'عرض حصري' : 'Flash Sale'}</div>
                        <div className="text-xl font-black leading-tight">50% OFF</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Badge — Trending */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -bottom-5 -left-5 lg:-bottom-6 lg:-left-6 z-20">
                  <motion.div animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                    className="bg-white/[0.97] backdrop-blur-md text-green px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/20 border border-brown/10">
                    <div className="flex items-center gap-2.5">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity }}
                        className="bg-green/10 p-1.5 rounded-lg">
                        <TrendingUp className="text-brown w-4 h-4" />
                      </motion.div>
                      <div>
                        <div className="text-[8px] font-bold text-green/50 uppercase tracking-[0.15em]">{isArabic ? 'الأكثر مبيعاً' : 'Trending'}</div>
                        <div className="text-xl font-black text-green leading-tight">#1 Rated</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ===== MOBILE HERO IMAGES ===== */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 lg:hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-brown/10 rounded-2xl blur-2xl scale-95 translate-y-4"></div>
              <div className="relative flex gap-3 justify-center items-end px-2">
                {[0, 1, 2].map((idx) => (
                  <motion.div key={idx}
                    animate={{ y: [0, idx === 1 ? -12 : -6, 0] }}
                    transition={{ duration: idx === 1 ? 4.5 : 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    className={`${idx === 1 ? 'w-[35%] z-10 -mb-2' : 'w-[28%]'} aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-white/10 ${idx === 0 ? '-rotate-3' : idx === 2 ? 'rotate-3' : ''}`}>
                    <img src={products[idx].image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {idx === 1 && (
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-2 right-2 bg-brown text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg">
                        HOT 🔥
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== PRODUCT SHOWCASE STRIP ===== */}
        <motion.div style={{ y: marqueeY }} className="relative z-10 pb-28 sm:pb-32">
          <div className="container mx-auto px-4 sm:px-6 mb-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Crown className="w-3.5 h-3.5 text-brown/60" />
              </motion.div>
              <span className="text-[10px] sm:text-xs text-white/30 font-semibold uppercase tracking-[0.2em]">
                {isArabic ? 'منتجاتنا المميزة' : 'Featured Items'}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
            </motion.div>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#0a0c06] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#0a0c06] to-transparent z-10 pointer-events-none"></div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}>
              <motion.div
                animate={{ x: isArabic ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-3 sm:gap-4 shrink-0">
                {[...showcaseProducts, ...showcaseProducts].map((product, i) => (
                  <Link key={i} to={`/products/${product.id}`}
                    className="group relative flex-shrink-0 w-28 sm:w-36 md:w-44">
                    <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06] hover:border-brown/40 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-brown/20">
                      <img src={product.image} alt={isArabic ? product.nameAr : product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <p className="text-white text-[9px] sm:text-[10px] font-bold truncate">{isArabic ? product.nameAr : product.name}</p>
                        <p className="text-brown text-[10px] sm:text-xs font-black">{product.price} {t('egp')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold">{isArabic ? 'اكتشف المزيد' : 'Scroll'}</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} className="text-brown/50" />
          </motion.div>
        </motion.div>

        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
            <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-4 sm:py-8 bg-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl shadow-black/[0.06] border border-gray-100/80 px-4 sm:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {trustFeatures.map((feature, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }} whileHover={{ y: -5, scale: 1.03 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-start cursor-default group">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}
                    className="bg-brown/8 group-hover:bg-brown/15 p-2.5 sm:p-3 rounded-xl flex-shrink-0 transition-colors duration-400">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brown" />
                  </motion.div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-green">{feature.title}</h4>
                    <p className="text-[10px] sm:text-xs text-green/40 mt-0.5">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 sm:py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-0.5 bg-brown mx-auto mb-5" />
            <span className="inline-block text-brown font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 sm:mb-4">
              {isArabic ? 'استكشف' : 'Explore'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green mb-3 sm:mb-5">{t('categories')}</h2>
            <p className="text-sm sm:text-base text-green/40 max-w-md mx-auto leading-relaxed">
              {isArabic ? 'اكتشف مجموعتنا الواسعة من الفئات المختارة بعناية' : 'Discover our wide range of carefully curated categories'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((category, index) => (
              <motion.div key={category.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <CategoryCard category={{ ...category, name: isArabic ? category.nameAr : category.name }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#faf9f7] to-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brown/15 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-0.5 bg-brown mx-auto mb-5" />
            <span className="inline-block text-brown font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 sm:mb-4">
              {isArabic ? 'الأكثر مبيعاً' : 'Best Sellers'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green mb-3 sm:mb-5">
              {isArabic ? 'منتجات مميزة' : 'Featured Products'}
            </h2>
            <p className="text-sm sm:text-base text-green/40 max-w-md mx-auto leading-relaxed">
              {isArabic ? 'منتجات منتقاة بعناية من أجلك' : 'Handpicked products just for you'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <ProductCard product={{ ...product, name: isArabic ? product.nameAr : product.name }} />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }} className="text-center mt-12 sm:mt-16">
            <Link to="/products"
              className="group relative inline-flex items-center justify-center gap-2.5 bg-green text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold overflow-hidden hover:shadow-2xl hover:shadow-green/20 transition-all duration-500 hover:scale-[1.05]">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative">{t('viewAll')}</span>
              <ArrowRight size={16} className="relative sm:w-[18px] sm:h-[18px] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0a0c06] via-green to-[#161809] text-white relative overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-80 h-80 bg-brown/8 rounded-full blur-[100px]" />
        <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-brown/8 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }} className="w-12 h-0.5 bg-brown mx-auto mb-8" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
                {isArabic ? 'انضم إلى عائلة' : 'Join the'}
                <span className="block text-gradient">{isArabic ? 'دارنا' : 'DARNA Family'}</span>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }} className="text-sm sm:text-base md:text-lg mb-9 sm:mb-12 text-white/40 font-light max-w-md mx-auto leading-relaxed">
              {isArabic ? 'احصل على عروض حصرية وكن أول من يعرف عن المنتجات الجديدة'
                : 'Get exclusive deals and be the first to know about new products'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-md mx-auto">
              <input type="email" placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="px-6 py-3.5 sm:py-4 rounded-full w-full sm:flex-1 text-green font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brown/40 shadow-lg bg-white/95 placeholder:text-green/40" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="group relative bg-gradient-to-r from-brown to-[#a67340] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm overflow-hidden hover:shadow-2xl hover:shadow-brown/30 transition-all duration-500 whitespace-nowrap">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative">{isArabic ? 'اشترك الآن' : 'Subscribe Now'}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}