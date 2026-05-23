import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Banner from './Banner';

export default function Section1() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="md:hidden w-full mb-6">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 mb-4 rounded" 
        />
        <div className="grid grid-cols-2 gap-2">
          {['Woman’s Fashion', 'Men’s Fashion', 'Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor', 'Baby’s & Toys', 'Groceries & Pets', 'Health & Beauty'].map((item) => (
            <button key={item} className="bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 text-xs text-left rounded">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        <aside className="hidden md:block w-[220px] pt-6 border-r border-gray-200 dark:border-zinc-800">
          <ul className="flex flex-col gap-4 text-sm dark:text-white">
            <li className="cursor-pointer hover:underline flex justify-between">Woman’s Fashion <span>❯</span></li>
            <li className="cursor-pointer hover:underline flex justify-between">Men’s Fashion <span>❯</span></li>
            <li className="cursor-pointer hover:underline">Electronics</li>
            <li className="cursor-pointer hover:underline">Home & Lifestyle</li>
            <li className="cursor-pointer hover:underline">Medicine</li>
            <li className="cursor-pointer hover:underline">Sports & Outdoor</li>
            <li className="cursor-pointer hover:underline">Baby’s & Toys</li>
            <li className="cursor-pointer hover:underline">Groceries & Pets</li>
            <li className="cursor-pointer hover:underline">Health & Beauty</li>
          </ul>
        </aside>

        <div className="flex-1 overflow-hidden">
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