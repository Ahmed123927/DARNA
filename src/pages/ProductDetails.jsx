// src/pages/ProductDetails.jsx
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ShoppingCart, ChevronRight, Home, Star, Truck, RotateCcw, Shield, MessageCircle } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-black text-green/20 mb-4">404</h1>
          <p className="text-lg sm:text-xl font-bold text-green mb-6">
            {isArabic ? 'المنتج غير موجود' : 'Product not found'}
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-brown text-white px-6 py-3 rounded-full font-bold hover:bg-green transition-colors">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  const handleBuyNow = () => {
    const message = `Hello DARNA,%0A%0AI would like to buy:%0A%0AProduct: ${isArabic ? product.nameAr : product.name}%0APrice: ${product.price} EGP%0A%0AThank you!`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-green via-[#2a2d1a] to-green pt-28 sm:pt-36 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brown/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap"
          >
            <Link to="/" className="text-white/50 hover:text-brown transition-colors flex items-center gap-1">
              <Home size={13} className="sm:w-3.5 sm:h-3.5" />
              {t('home')}
            </Link>
            <ChevronRight size={13} className="text-white/30 sm:w-3.5 sm:h-3.5" />
            <Link to="/products" className="text-white/50 hover:text-brown transition-colors">
              {t('products')}
            </Link>
            <ChevronRight size={13} className="text-white/30 sm:w-3.5 sm:h-3.5" />
            <span className="text-brown font-semibold line-clamp-1">
              {isArabic ? product.nameAr : product.name}
            </span>
          </motion.nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 mb-16 sm:mb-20">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl shadow-black/10 bg-white">
              <img
                src={product.image}
                alt={isArabic ? product.nameAr : product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} sm:w-[18px] sm:h-[18px]`}
                  />
                ))}
                <span className="text-xs sm:text-sm text-green/40 ml-2 font-medium">(4.0) • 24 {isArabic ? 'تقييم' : 'reviews'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-green mb-4 sm:mb-5 leading-tight">
                {isArabic ? product.nameAr : product.name}
              </h1>
              
              <div className="flex items-baseline gap-2 mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-black text-brown">{product.price}</span>
                <span className="text-sm sm:text-base text-green/40 font-semibold">{t('egp')}</span>
              </div>

              <div className="mb-6 sm:mb-8">
                <h2 className="text-sm sm:text-base font-bold text-green mb-2 uppercase tracking-wider">
                  {t('description')}
                </h2>
                <p className="text-sm sm:text-base text-green/60 leading-relaxed">
                  {isArabic ? product.descriptionAr : product.description}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBuyNow}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:shadow-[#25D366]/20 hover:scale-[1.02] mb-6 sm:mb-8"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                {t('buyNow')} — WhatsApp
              </button>

              {/* Mini trust badges */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-200">
                {[
                  { icon: Truck, label: isArabic ? 'شحن مجاني' : 'Free Shipping' },
                  { icon: RotateCcw, label: isArabic ? 'إرجاع مجاني' : 'Free Returns' },
                  { icon: Shield, label: isArabic ? 'ضمان الجودة' : 'Quality Guaranteed' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-1.5">
                    <div className="bg-green/5 p-2 rounded-lg">
                      <item.icon size={14} className="text-brown sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-green/50 font-semibold leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-green">
                  {t('relatedProducts')}
                </h2>
                <Link to="/products" className="text-xs sm:text-sm text-brown font-bold hover:text-green transition-colors flex items-center gap-1">
                  {t('viewAll')}
                  <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <ProductCard
                      product={{
                        ...relatedProduct,
                        name: isArabic ? relatedProduct.nameAr : relatedProduct.name,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}