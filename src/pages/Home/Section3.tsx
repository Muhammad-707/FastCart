import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { 
  Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, 
  ArrowLeft, ArrowRight, Shirt, Home, Dumbbell, Cpu, Package 
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Card4 } from './Card4'; 
import type { RootState } from '@/store/store';
import { useTranslation } from "react-i18next";

const getCategoryIcon = (name: string) => {
  const key = String(name || '').toLowerCase().trim();
  
  if (key.includes('phone') || key.includes('mobile')) return <Smartphone size={40} />;
  if (key.includes('computer') || key.includes('laptop') || key.includes('pc')) return <Monitor size={40} />;
  if (key.includes('watch')) return <Watch size={40} />;
  if (key.includes('camera')) return <Camera size={40} />;
  if (key.includes('head') || key.includes('audio')) return <Headphones size={40} />;
  if (key.includes('gam') || key.includes('toy')) return <Gamepad2 size={40} />;
  if (key.includes('fashion') || key.includes('cloth') || key.includes('wear')) return <Shirt size={40} />;
  if (key.includes('home') || key.includes('garden')) return <Home size={40} />;
  if (key.includes('sport') || key.includes('outdoor') || key.includes('fitness')) return <Dumbbell size={40} />;
  if (key.includes('electronic')) return <Cpu size={40} />;
  
  return <Package size={40} />;
};

export default function Section3() {
  const { items } = useSelector((state: RootState) => state.categories);
  const { t } = useTranslation();
  const [active, setActive] = useState('');
  
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
      className={`max-w-[1400px] mx-auto px-6 py-20 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden ${isVisible ? 'is-visible' : 'opacity-0 translate-y-10'}`}
      style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
    >
      <style>{`
        .cat-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-cat {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          filter: blur(4px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .is-visible .cat-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .is-visible .stagger-cat {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0);
        }
      `}</style>

      <div className="cat-reveal flex justify-between items-center mb-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 group">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"></div>
            <span className="text-[#DB4444] font-semibold tracking-wide uppercase text-sm">{t("text68")}</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-wide dark:text-white transition-colors duration-300 hover:text-zinc-800 dark:hover:text-zinc-200">{t("text69")}</h2>
        </div>
        <div className="flex gap-2">
          <button className="cat-prev p-3 bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700/50 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-90 transition-all duration-200 dark:text-white hover:-translate-x-0.5">
            <ArrowLeft size={20} />
          </button>
          <button className="cat-next p-3 bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700/50 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-90 transition-all duration-200 dark:text-white hover:translate-x-0.5">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.cat-next', prevEl: '.cat-prev' }}
        spaceBetween={30}
        breakpoints={{ 320: { slidesPerView: 2 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
        className="!overflow-visible"
      >
        {Array.isArray(items) && items.map((cat: any, idx: number) => (
          <SwiperSlide key={cat.id}>
            <div 
              className="stagger-cat" 
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <Card4 
                id={cat.id} 
                icon={getCategoryIcon(cat.categoryName)} 
                label={cat.categoryName} 
                isActive={active === cat.categoryName} 
                onClick={() => setActive(cat.categoryName)} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}