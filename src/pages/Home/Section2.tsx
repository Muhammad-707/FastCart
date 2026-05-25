import { useEffect, useState } from 'react';
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
  <div className="flex flex-col items-center rounded-xl px-3 py-2 min-w-[70px] md:min-w-[85px] backdrop-blur-sm transition-all duration-300 hover:scale-105">
    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</span>
    <span className="text-2xl md:text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">{value}</span>
  </div>
);

export default function Section2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state: RootState) => state.products);

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

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
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16 md:py-24 border-b border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="flex flex-col gap-5 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md shadow-sm shadow-[#DB4444]/20"></div>
            <span className="text-[#DB4444] font-bold text-sm tracking-wider uppercase">{t("text61")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{t("text62")}</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <Timer label={t("text63")} value={timeLeft.days} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse">:</span>
              <Timer label={t("text64")} value={timeLeft.hours} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse">:</span>
              <Timer label={t("text65")} value={timeLeft.minutes} />
              <span className="text-xl text-[#DB4444] font-black animate-pulse">:</span>
              <Timer label={t("text66")} value={timeLeft.seconds} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 self-end md:self-auto">
          <button className="flash-prev p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 dark:text-white shadow-sm transition-all duration-200">
            <ArrowLeft size={18} />
          </button>
          <button className="flash-next p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 dark:text-white shadow-sm transition-all duration-200">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-[#DB4444] dark:border-t-[#DB4444] rounded-full animate-spin"></div>
        </div>
      ) : (
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
            {Array.isArray(products) &&
              products.map((prod: any) => (
                <SwiperSlide key={prod.id} className="h-auto">
                  <div className="h-full transition-transform duration-300 hover:-translate-y-1">
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
      )}

      <div className="flex justify-center mt-16">
        <button
          onClick={() => navigate('/product')}
          className="bg-[#DB4444] text-white px-14 py-4 rounded-xl font-semibold hover:bg-[#c23b3b] active:scale-98 transition-all duration-200 shadow-md shadow-[#DB4444]/10 hover:shadow-[#DB4444]/20 tracking-wide"
        >
          {t("text67")}
        </button>
      </div>
    </section>
  );
}