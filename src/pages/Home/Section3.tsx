import React, { useState } from 'react';
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
  const [active, setActive] = useState('');

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
          <button className="cat-prev p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors dark:text-white">
            <ArrowLeft size={20} />
          </button>
          <button className="cat-next p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors dark:text-white">
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
              id={cat.id} 
              icon={getCategoryIcon(cat.categoryName)} 
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