// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ShoppingBag, Globe, Instagram, Facebook, Twitter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isArabic = i18n.language === 'ar'

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const menuItems = [
    { name: t('home'), path: '/' },
    { name: t('categories'), path: '/categories' },
    { name: t('products'), path: '/products' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#2a2d1a]/95 backdrop-blur-xl shadow-2xl shadow-black/20' 
          : 'bg-[#2a2d1a]/80 backdrop-blur-md'
      }`}
    >
      {/* Marquee */}
      <div className="bg-gradient-to-r from-brown via-[#a67340] to-brown text-white overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-1.5 sm:py-2"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.08em] sm:tracking-[0.15em]">
            🔥 SALE UP TO 50% OFF • ✨ FREE SHIPPING ON ORDERS OVER 500 EGP • 🎁 NEW ARRIVALS DAILY • ⚡ LIMITED TIME OFFER • 🔥 SALE UP TO 50% OFF • ✨ FREE SHIPPING ON ORDERS OVER 500 EGP • 🎁 NEW ARRIVALS DAILY • ⚡ LIMITED TIME OFFER • 🔥 SALE UP TO 50% OFF • ✨ FREE SHIPPING ON ORDERS OVER 500 EGP • 🎁 NEW ARRIVALS DAILY • ⚡ LIMITED TIME OFFER • 
          </span>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className={`border-b transition-colors duration-300 ${scrolled ? 'border-brown/30' : 'border-brown/15'}`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            
            {/* Left Side - Social Icons */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-4">
              <a 
                href="#" 
                className="text-brown/70 hover:text-white transition-all duration-300 hover:scale-110 p-1.5"
              >
                <Instagram size={16} className="lg:w-[18px] lg:h-[18px]" />
              </a>
              <a 
                href="#" 
                className="text-brown/70 hover:text-white transition-all duration-300 hover:scale-110 p-1.5"
              >
                <Facebook size={16} className="lg:w-[18px] lg:h-[18px]" />
              </a>
              <a 
                href="#" 
                className="text-brown/70 hover:text-white transition-all duration-300 hover:scale-110 p-1.5"
              >
                <Twitter size={16} className="lg:w-[18px] lg:h-[18px]" />
              </a>
            </div>

            {/* Mobile: Menu Button (left side) */}
            <button
              className={`sm:hidden transition-colors p-1.5 ${
                mobileMenuOpen ? 'text-white' : 'text-brown'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Center - Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-black text-gradient hover:scale-105 transition-transform duration-300 z-10"
            >
              DARNA
            </Link>

            {/* Right Side - Language & Menu */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider text-brown hover:text-white transition-all duration-300 hover:scale-105 bg-brown/10 hover:bg-brown/25 px-2.5 sm:px-3 py-1.5 rounded-full"
              >
                <Globe size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
                {i18n.language === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Desktop/Tablet Menu Button */}
              <button
                className={`hidden sm:block lg:hidden transition-colors p-1.5 ${
                  mobileMenuOpen ? 'text-white' : 'text-brown'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Menu - Below Logo */}
      <div className="hidden lg:block border-b border-brown/15">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-center gap-10 xl:gap-14 py-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-xs xl:text-sm font-bold uppercase tracking-[0.2em] xl:tracking-[0.25em] transition-all duration-300 group py-1 px-3 ${
                  isActive(item.path) ? 'text-white' : 'text-brown/80 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brown/20 rounded-full -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brown opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <motion.div
                initial={{ x: isArabic ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isArabic ? '-100%' : '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className={`fixed top-0 ${isArabic ? 'left-0' : 'right-0'} bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-[#1a1d0f] via-[#2a2d1a] to-[#1a1d0f] z-[70] lg:hidden shadow-2xl overflow-y-auto border-r border-[#bd8749]/10`}
              >
                <div className="p-6 sm:p-8 min-h-screen flex flex-col">
                  {/* Close Button */}
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`absolute top-5 ${isArabic ? 'left-5' : 'right-5'} text-brown/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5`}
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>

                  {/* Logo */}
                  <Link 
                    to="/" 
                    className="text-4xl sm:text-5xl font-black text-gradient block mb-12 mt-8"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    DARNA
                  </Link>

                  {/* Menu Items */}
                  <nav className="flex flex-col gap-2 mb-10 flex-1">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <Link
                          to={item.path}
                          className={`block text-2xl sm:text-3xl font-black py-3 px-4 rounded-xl transition-all duration-300 ${
                            isActive(item.path) 
                              ? 'text-white bg-brown/15 border-l-4 border-brown pl-5' 
                              : 'text-brown/60 hover:text-white hover:bg-white/5 hover:pl-6'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="border-t border-brown/10 my-6"></div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        toggleLanguage()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center gap-3 text-lg font-bold text-brown/80 hover:text-white transition-all duration-300 bg-brown/10 hover:bg-brown/20 px-5 py-4 rounded-xl w-full border border-brown/10"
                    >
                      <Globe size={20} />
                      {i18n.language === 'en' ? 'العربية' : 'English'}
                    </button>
                    
                    <div className="pt-6">
                      <p className="text-[10px] font-bold text-brown/40 uppercase tracking-widest mb-4 text-center">
                        {isArabic ? 'تابعنا' : 'Follow Us'}
                      </p>
                      <div className="flex justify-center gap-4">
                        <a href="#" className="bg-brown/10 hover:bg-brown text-brown/60 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                          <Instagram size={20} />
                        </a>
                        <a href="#" className="bg-brown/10 hover:bg-brown text-brown/60 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                          <Facebook size={20} />
                        </a>
                        <a href="#" className="bg-brown/10 hover:bg-brown text-brown/60 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                          <Twitter size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-brown/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] -z-10 pointer-events-none"></div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  )
}