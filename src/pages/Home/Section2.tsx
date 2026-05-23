import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import Card2 from './Card2';
import { type RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const Timer = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col dark:text-white">
    <span className="text-[10px] font-medium">{label}</span>
    <span className="text-3xl md:text-4xl font-bold tracking-widest">{value}</span>
  </div>
);

export default function Section2() {
  const navigate = useNavigate();
  const { items: products, loading } = useSelector((state: RootState) => state.products);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
            <span className="text-[#DB4444] font-semibold">Today's</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-wide dark:text-white">Flash Sales</h2>
            <div className="flex items-center gap-2 md:gap-4">
              <Timer label="Days" value="03" /> <span className="text-2xl text-[#DB4444] font-bold mt-3">:</span>
              <Timer label="Hours" value="23" /> <span className="text-2xl text-[#DB4444] font-bold mt-3">:</span>
              <Timer label="Minutes" value="19" /> <span className="text-2xl text-[#DB4444] font-bold mt-3">:</span>
              <Timer label="Seconds" value="56" />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flash-prev p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:text-white"><ArrowLeft size={20} /></button>
          <button className="flash-next p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:text-white"><ArrowRight size={20} /></button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 dark:text-white">Loading products...</div>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: '.flash-next', prevEl: '.flash-prev' }}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
        >
          {Array.isArray(products) && products.map((prod: any) => (
            <SwiperSlide key={prod.id}>
              <Card2
                id={prod.id}
                discount={prod.hasDiscount ? `-${Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}%` : undefined}
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
      )}

      <div className="flex justify-center mt-16">
        <button
          onClick={() => navigate('/product')}
          className="bg-[#DB4444] text-white px-12 py-4 rounded font-medium hover:bg-[#e07575] transition-colors"
        >
          View All Products
        </button>
      </div>
    </section>
  );
}