import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { RootState } from '@/store/store';
import Card5 from './Card5';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Section6() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items: products } = useSelector((state: RootState) => state.products);
  const [currentPage] = useState(1);
  const itemsPerPage = 8;

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
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const safeItems = Array.isArray(products) ? products.filter(Boolean) : [];
  const currentItems = safeItems.slice(0, 16).slice(0, itemsPerPage * currentPage);

  return (
    <section 
      ref={sectionRef}
      className={`max-w-[1400px] mx-auto px-6 py-20 overflow-hidden relative ${isVisible ? 'is-visible' : ''}`}
    >
      <style>{`
        .reveal-header {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-grid-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .is-visible .reveal-header {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible .stagger-grid-item {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="reveal-header flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-semibold">{t("text76")}</span>
      </div>
      <h2 className="reveal-header text-3xl font-semibold tracking-wider mb-10 dark:text-white" style={{ transitionDelay: '0.05s' }}>{t("text77")}</h2>

      <div className="block md:hidden">
        <Swiper spaceBetween={20} slidesPerView={1.2}>
          {safeItems.map((prod: any, idx: number) => (
            <SwiperSlide key={prod.id}>
              <div 
                className="stagger-grid-item h-full transition-transform duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <Card5 product={prod} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-8">
          {currentItems.map((prod: any, idx: number) => (
            <div 
              key={prod.id} 
              className="stagger-grid-item"
              style={{ transitionDelay: `${(idx % 4) * 0.08}s` }}
            >
              <Card5 product={prod} />
            </div>
          ))}
        </div>
        <div className="reveal-header flex justify-center mt-16" style={{ transitionDelay: '0.2s' }}>
          <button onClick={() => navigate('/product')} className="bg-[#DB4444] text-white px-12 py-4 rounded-sm hover:bg-[#c23b3b] transition-colors">
            {t("text78")}
          </button>
        </div>
      </div>
    </section>
  );
}