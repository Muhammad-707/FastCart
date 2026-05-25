import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Card2 from './Card2';
import { useTranslation } from "react-i18next";

import i1 from "@/assets/image 46.png";
import i2 from "@/assets/image 51.png";
import i3 from "@/assets/image 47.png";

export default function Section3() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-20 bg-white dark:bg-zinc-950">
      <style>{`
        .swiper-pagination-bullet {
          background: #A1A1AA !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #DB4444 !important;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          <SwiperSlide>
            <Card2 image={i1} name={t("text173")} role={t("text174")} />
          </SwiperSlide>
          <SwiperSlide>
            <Card2 image={i2} name={t("text175")} role={t("text176")} />
          </SwiperSlide>
          <SwiperSlide>
            <Card2 image={i3} name={t("text177")} role={t("text178")} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}