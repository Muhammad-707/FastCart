import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import Card2 from './Card2';
import { type RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Timer = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center rounded-xl px-3 py-2 min-w-[70px] md:min-w-[85px] backdrop-blur-sm transition-all duration-300 hover:scale-105 group/timer">
    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5 group-hover/timer:text-[#DB4444] transition-colors duration-300">{label}</span>
    <span className="text-2xl md:text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">{value}</span>
  </div>
);

export default function Section2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state: RootState) => state.products);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

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

  useEffect(() => {
    const targetDate = new Date('2026-05-29T00:00:00+05:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`max-w-[1400px] mx-auto px-4 sm:px-6 py-16 md:py-24 border-b border-zinc-100 dark:border-zinc-900 overflow-hidden relative ${isVisible ? 'is-visible' : ''}`}
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

      <div className="reveal-item flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="flex flex-col gap-5 w-full md:w-auto">
          <div className="flex items-center gap-3 group">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md shadow-sm shadow-[#DB4444]/20 transition-transform duration-500 group-hover:scale-y-110 group-hover:rotate-6"></div>
            <span className="text-[#DB4444] font-bold text-sm tracking-wider uppercase transition-tracking duration-300 group-hover:letter-spacing-wider">{t("text61")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300 hover:text-zinc-800 dark:hover:text-zinc-200">{t("text62")}</h2>
            <div className="flex items-center gap-2 sm:gap-3 p-1.5">
              <Timer label={t("text63")} value={timeLeft.days} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse pb-2">:</span>
              <Timer label={t("text64")} value={timeLeft.hours} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse pb-2">:</span>
              <Timer label={t("text65")} value={timeLeft.minutes} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse pb-2">:</span>
              <Timer label={t("text66")} value={timeLeft.seconds} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 self-end md:self-auto">
          <button className="flash-prev p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-90 dark:text-white shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#DB4444]/40 dark:hover:border-[#DB4444]/40">
            <ArrowLeft size={18} />
          </button>
          <button className="flash-next p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-90 dark:text-white shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-[#DB4444]/40 dark:hover:border-[#DB4444]/40">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="px-1 py-2">
        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: '.flash-next', prevEl: '.flash-prev' }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            480: { slidesPerView: 1.6, spaceBetween: 16 },
            640: { slidesPerView: 2.3, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 30 }
          }}
          className="!overflow-visible"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SwiperSlide key={`skeleton-${idx}`} className="h-auto">
                  <div className="stagger-card h-full" style={{ transitionDelay: `${idx * 0.1}s` }}>
                    <Card2 isLoading={true} />
                  </div>
                </SwiperSlide>
              ))
            : Array.isArray(products) &&
              products.map((prod: any, idx: number) => (
                <SwiperSlide key={prod.id} className="h-auto">
                  <div 
                    className="stagger-card h-full transition-all duration-500 hover:-translate-y-2 rounded-2xl"
                    style={{ transitionDelay: `${Math.min(idx * 0.08, 0.4)}s` }}
                  >
                    <Card2
                      id={prod.id}
                      discount={
                        prod.hasDiscount
                          ? `-${Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}%`
                          : undefined
                      }
                      image={prod.image}
                      title={prod.productName}
                      price={prod.hasDiscount ? prod.discountPrice : prod.price}
                      oldPrice={prod.hasDiscount ? `$${prod.price}` : undefined}
                      rating={prod.rating || 5}
                      quantity={prod.quantity}
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <div className="reveal-item flex justify-center mt-16" style={{ transitionDelay: '0.2s' }}>
        <button
          onClick={() => navigate('/product')}
          className="group/btn relative overflow-hidden bg-[#DB4444] text-white px-14 py-4 rounded-xl font-semibold active:scale-95 transition-all duration-300 shadow-md shadow-[#DB4444]/10 hover:shadow-xl hover:shadow-[#DB4444]/20 tracking-wide"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            {t("text67")}
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </span>
        </button>
      </div>
    </section>
  );
}