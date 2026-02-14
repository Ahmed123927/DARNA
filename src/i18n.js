// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      categories: 'Categories',
      products: 'Products',
      shopNow: 'Shop Now',
      viewAll: 'View All',
      exploreCategories: 'Explore Categories',
      allProducts: 'All Products',
      productDetails: 'Product Details',
      price: 'Price',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      description: 'Description',
      relatedProducts: 'Related Products',
      discoverDarna: 'Discover DARNA',
      premiumQuality: 'Premium Quality Products',
      browseOurCollection: 'Browse our exclusive collection of premium products',
      egp: 'EGP',
    }
  },
  ar: {
    translation: {
      home: 'الرئيسية',
      categories: 'الفئات',
      products: 'المنتجات',
      shopNow: 'تسوق الآن',
      viewAll: 'عرض الكل',
      exploreCategories: 'استكشف الفئات',
      allProducts: 'جميع المنتجات',
      productDetails: 'تفاصيل المنتج',
      price: 'السعر',
      buyNow: 'اشتري الآن',
      addToCart: 'أضف للسلة',
      description: 'الوصف',
      relatedProducts: 'منتجات ذات صلة',
      discoverDarna: 'اكتشف دارنا',
      premiumQuality: 'منتجات بجودة عالية',
      browseOurCollection: 'تصفح مجموعتنا الحصرية من المنتجات المميزة',
      egp: 'جنيه',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;