// src/pages/Categories.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { categories } from '../data/categories'
import CategoryCard from '../components/CategoryCard'

export default function Categories() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-green via-[#2a2d1a] to-green pt-28 sm:pt-36 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brown/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mb-5 sm:mb-6"
          >
            <Link to="/" className="text-white/50 hover:text-brown transition-colors flex items-center gap-1">
              <Home size={13} className="sm:w-3.5 sm:h-3.5" />
              {t('home')}
            </Link>
            <ChevronRight size={13} className="text-white/30 sm:w-3.5 sm:h-3.5" />
            <span className="text-brown font-semibold">{t('categories')}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3">
              {t('exploreCategories')}
            </h1>
            <p className="text-sm sm:text-base text-white/40 max-w-lg">
              {isArabic 
                ? 'تصفح مجموعتنا المتنوعة من الفئات واكتشف ما يناسبك'
                : 'Browse through our diverse collection and find what suits you'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <CategoryCard
                category={{
                  ...category,
                  name: isArabic ? category.nameAr : category.name,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}