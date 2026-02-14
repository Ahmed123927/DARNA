// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react'

export default function ProductCard({ product }) {
  const { t } = useTranslation()

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden group border border-gray-100 hover:border-brown/20 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brown/[0.08] card-shine"
    >
      <Link to={`/products/${product.id}`}>
        {/* Image Area */}
        <div className="aspect-[4/5] overflow-hidden relative bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[800ms] ease-out"
            loading="lazy"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Action buttons — slide up from bottom on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex justify-center gap-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <motion.button 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green p-2.5 sm:p-3 rounded-full shadow-xl hover:bg-brown hover:text-white transition-colors duration-300"
            >
              <Eye size={15} className="sm:w-4 sm:h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brown text-white p-2.5 sm:p-3 rounded-full shadow-xl hover:bg-green transition-colors duration-300"
            >
              <ShoppingCart size={15} className="sm:w-4 sm:h-4" />
            </motion.button>
          </div>

          {/* Wishlist button — top right */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-red-50 hover:text-red-500 text-gray-400"
          >
            <Heart size={13} className="sm:w-3.5 sm:h-3.5" />
          </motion.button>
          
          {/* Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="bg-green text-white text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-md">
              New
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-3.5 sm:p-5">
          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-1.5 sm:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={`${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} sm:w-3 sm:h-3`}
              />
            ))}
            <span className="text-[9px] sm:text-[10px] text-gray-400 ml-1 font-medium">(4.0)</span>
          </div>
          
          <h3 className="text-[13px] sm:text-sm font-bold text-green mb-2 sm:mb-3 line-clamp-2 leading-snug group-hover:text-brown transition-colors duration-400">
            {product.name}
          </h3>
          
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-brown">{product.price}</span>
            <span className="text-[9px] sm:text-[10px] text-green/40 font-semibold">{t('egp')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}