import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Banner from './Banner';
import SidebarCategories from './SideBarCategory'; 

export default function Section1() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="md:hidden">
        <SidebarCategories />
        <Swiper className="w-full h-[500px] mb-6">
          <SwiperSlide><Banner /></SwiperSlide>
          <SwiperSlide><Banner /></SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden md:flex gap-10">
        <SidebarCategories />
        <div className="flex-1 overflow-hidden pt-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="w-full lg:h-[420px] h-[500px]"
          >
            <SwiperSlide><Banner /></SwiperSlide>
            <SwiperSlide><Banner /></SwiperSlide>
            <SwiperSlide><Banner /></SwiperSlide>
            <SwiperSlide><Banner /></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}