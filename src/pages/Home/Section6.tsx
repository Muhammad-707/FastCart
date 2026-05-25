import { useState } from 'react';
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

  const safeItems = Array.isArray(products) ? products.filter(Boolean) : [];
  const currentItems = safeItems.slice(0, 16).slice(0, itemsPerPage * currentPage);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-semibold">{t("text76")}</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-wider mb-10 dark:text-white">{t("text77")}</h2>

      <div className="block md:hidden">
        <Swiper spaceBetween={20} slidesPerView={1.2}>
          {safeItems.map((prod: any) => (
            <SwiperSlide key={prod.id}>
              <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                <Card5 product={prod} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-8">
          {currentItems.map((prod: any) => <Card5 key={prod.id} product={prod} />)}
        </div>
        <div className="flex justify-center mt-16">
          <button onClick={() => navigate('/product')} className="bg-[#DB4444] text-white px-12 py-4 rounded-sm hover:bg-[#c23b3b] transition-colors">
            {t("text78")}
          </button>
        </div>
      </div>
    </section>
  );
}