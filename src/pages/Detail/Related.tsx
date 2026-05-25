import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import 'swiper/css';
import { useTranslation } from "react-i18next";


import Card2 from '@/pages/Home/Card2'; 

export default function RelatedItems() {
  const { t } = useTranslation();
  const { items, currentProduct } = useSelector((state: any) => state.products);

  const relatedProducts = items.filter((p: any) => p.id !== currentProduct?.id);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
        <h2 className="text-2xl font-semibold text-black dark:text-white">{t("text125")}</h2>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {relatedProducts.map((prod: any) => (
          <SwiperSlide key={prod.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}