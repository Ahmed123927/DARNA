// src/components/Marquee.jsx
import { motion } from 'framer-motion'

export default function Marquee() {
  const saleText = "🔥 SALE UP TO 50% OFF • ✨ FREE SHIPPING ON ORDERS OVER 500 EGP • 🎁 NEW ARRIVALS DAILY • ⚡ LIMITED TIME OFFER • "
  const fullText = saleText.repeat(10)

  return (
    <div className="bg-brown text-white overflow-hidden fixed top-0 left-0 right-0 z-50 shadow-lg">
      <motion.div
        className="flex whitespace-nowrap py-3"
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <span className="text-sm font-bold tracking-[0.15em]">{fullText}</span>
      </motion.div>
    </div>
  )
}