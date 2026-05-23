import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { 
  Smartphone, Monitor, Watch, Camera, Headset, Gamepad2, 
  LayoutGrid, ArrowLeft, ArrowRight 
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Card4 } from './Card4'; 
import type { RootState } from '@/store/store';

// Карта иконок: ключи должны точно совпадать с названиями категорий из API
const iconMap: Record<string, React.ReactNode> = {
  "Phones": <Smartphone size={40} />,
  "Computers": <Monitor size={40} />,
  "SmartWatch": <Watch size={40} />,
  "Camera": <Camera size={40} />,
  "HeadPhones": <Headset size={40} />,
  "Gaming": <Gamepad2 size={40} />,
};

export default function Section3() {
  const { items } = useSelector((state: RootState) => state.categories);
  const [active, setActive] = useState('Camera');

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
            <span className="text-[#DB4444] font-semibold">Categories</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-wide dark:text-white">Browse By Category</h2>
        </div>
        <div className="flex gap-2">
          <button className="cat-prev p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <button className="cat-next p-3 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.cat-next', prevEl: '.cat-prev' }}
        spaceBetween={30}
        breakpoints={{ 320: { slidesPerView: 2 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
      >
        {Array.isArray(items) && items.map((cat: any) => (
          <SwiperSlide key={cat.id}>
            <Card4 
              // Выбираем иконку из карты или ставим дефолтную, если категории нет в списке
              icon={iconMap[cat.categoryName] || <LayoutGrid size={40} />} 
              label={cat.categoryName} 
              isActive={active === cat.categoryName} 
              onClick={() => setActive(cat.categoryName)} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}