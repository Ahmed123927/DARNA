// src/components/Footer.jsx
import { useTranslation } from 'react-i18next'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <footer className="bg-gradient-to-b from-green to-[#1a1d0f] text-white relative overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brown/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14">
          
          {/* Brand */}
          <div className="text-center sm:text-start">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl sm:text-4xl font-black text-gradient mb-3 sm:mb-4">DARNA</h2>
            </Link>
            <p className="text-sm sm:text-base text-white/60 mb-5 sm:mb-6 leading-relaxed max-w-xs mx-auto sm:mx-0">
              {isArabic 
                ? 'وجهتك الأولى للتسوق الفاخر والمنتجات المميزة'
                : 'Your premier destination for luxury shopping and premium products'}
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="#" className="bg-brown/15 hover:bg-brown text-brown hover:text-white p-2.5 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brown/25">
                <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" className="bg-brown/15 hover:bg-brown text-brown hover:text-white p-2.5 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brown/25">
                <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a href="#" className="bg-brown/15 hover:bg-brown text-brown hover:text-white p-2.5 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brown/25">
                <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-start">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-5 text-white uppercase tracking-wider">{isArabic ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300 inline-flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-brown transition-all duration-300"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300 inline-flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-brown transition-all duration-300"></span>
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300 inline-flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-brown transition-all duration-300"></span>
                  {t('products')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-start">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-5 text-white uppercase tracking-wider">{isArabic ? 'خدمة العملاء' : 'Customer Service'}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><a href="#" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300">{isArabic ? 'اتصل بنا' : 'Contact Us'}</a></li>
              <li><a href="#" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300">{isArabic ? 'سياسة الإرجاع' : 'Return Policy'}</a></li>
              <li><a href="#" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300">{isArabic ? 'الشحن' : 'Shipping'}</a></li>
              <li><a href="#" className="text-sm sm:text-base text-white/50 hover:text-brown transition-colors duration-300">{isArabic ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-start">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-5 text-white uppercase tracking-wider">{isArabic ? 'تواصل معنا' : 'Contact Info'}</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <div className="bg-brown/15 p-2 rounded-lg flex-shrink-0 mt-0.5">
                  <MapPin className="text-brown w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-white/50">Cairo, Egypt</span> 
              </li> 
              <li className="flex items-center gap-3 justify-center sm:justify-start"> 
                <div className="bg-brown/15 p-2 rounded-lg flex-shrink-0">
                  <Phone className="text-brown w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-white/50" dir="ltr">+20 123 456 7890</span> 
              </li> 
              <li className="flex items-center gap-3 justify-center sm:justify-start"> 
                <div className="bg-brown/15 p-2 rounded-lg flex-shrink-0">
                  <Mail className="text-brown w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-white/50">info@darna.com</span> 
              </li> 
            </ul> 
          </div> 
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-white/40">
            © 2026 DARNA. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            {isArabic ? 'صنع بـ' : 'Made with'} <Heart size={12} className="text-brown fill-brown" /> {isArabic ? 'في مصر' : 'in Egypt'}
          </p>
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brown/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-brown/5 rounded-full blur-3xl"></div>
    </footer>
  )
}