import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { RootState } from '@/store/store';
import Card3 from './Card3';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Section4() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items: products } = useSelector((state: RootState) => state.products);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: "0px 0px -300px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`max-w-[1400px] mx-auto px-6 py-20 overflow-hidden relative ${isVisible ? 'is-visible' : ''}`}
    >
      <style>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-card {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .is-visible .reveal-item {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible .stagger-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      <div className="reveal-item flex items-center gap-3 mb-6 group">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm transition-transform duration-500 group-hover:scale-y-110 group-hover:rotate-6"></div>
        <span className="text-[#DB4444] font-semibold tracking-wide uppercase text-sm">{t("text70")}</span>
      </div>

      <div className="reveal-item flex justify-between items-center mb-10 gap-4" style={{ transitionDelay: '0.1s' }}>
        <h2 className="text-3xl font-semibold tracking-wider dark:text-white transition-colors duration-300 hover:text-zinc-800 dark:hover:text-zinc-200">{t("text71")}</h2>
        <button 
          onClick={() => navigate('/product')} 
          className="group/btn relative overflow-hidden bg-[#DB4444] text-white px-10 py-4 rounded-xl font-medium active:scale-95 transition-all duration-300 shadow-md shadow-[#DB4444]/10 hover:shadow-lg hover:shadow-[#DB4444]/20 shrink-0"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10">{t("text72")}</span>
        </button>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1.2}
        breakpoints={{ 768: { slidesPerView: 4 } }}
        className="!overflow-visible"
      >
        {Array.isArray(products) && products.filter(Boolean).slice(0, 4).map((product: any, idx: number) => (
          <SwiperSlide key={product.id}>
            <div 
              className="stagger-card h-full transition-all duration-500 hover:-translate-y-2 rounded-2xl"
              style={{ transitionDelay: `${(idx * 0.08) + 0.2}s` }}
            >
              <Card3
                image={product.image || '/placeholder.png'}
                title={product.productName}
                price={`$${product.hasDiscount ? product.discountPrice : product.price}`}
                oldPrice={product.hasDiscount ? `$${product.price}` : undefined}
                rating={product.rating || 5}
                reviews={product.quantity || 0} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}