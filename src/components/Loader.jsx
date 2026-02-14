// src/components/Loader.jsx
import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1a1d0f] via-green to-[#2a2d1a] flex items-center justify-center z-50">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brown/10 rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-wider mb-3"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(189, 135, 73, 0)',
                '0 0 40px rgba(189, 135, 73, 0.3)',
                '0 0 20px rgba(189, 135, 73, 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DARNA
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/40 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-6"
          >
            Premium Shopping
          </motion.p>

          {/* Loading bar */}
          <div className="relative w-48 sm:w-56 mx-auto">
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brown via-[#d4a574] to-brown"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}