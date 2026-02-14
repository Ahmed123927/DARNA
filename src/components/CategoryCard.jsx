// src/components/CategoryCard.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category }) {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden group h-64 sm:h-72 lg:h-80 cursor-pointer card-shine"
    >
      <Link to={`/products?category=${category.id}`} className="block h-full">
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-[900ms] ease-out"
            loading="lazy"
          />
        </div>
        
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/85 group-hover:via-black/30 transition-all duration-700"></div>
        <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/10 transition-colors duration-700"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end p-5 sm:p-7 text-center">
          {/* Category name — slides up on hover */}
          <motion.h3 
            className="text-white text-lg sm:text-xl lg:text-2xl font-black mb-3 sm:mb-4 group-hover:-translate-y-2 transition-all duration-500 leading-tight"
          >
            {category.name}
          </motion.h3>
          
          {/* Explore button — fade + slide up */}
          <div className="overflow-hidden">
            <div className="bg-white/90 backdrop-blur-md text-green px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-xl hover:bg-white">
              {isArabic ? 'استكشف' : 'Explore'}
              <ArrowRight size={13} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Top corner glow on hover */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brown/0 group-hover:bg-brown/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-all duration-700"></div>
      </Link>
    </motion.div>
  )
}