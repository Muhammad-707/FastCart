import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { RootState } from '@/store/store';
import Card3 from './Card3';
import { useNavigate } from 'react-router-dom';

export default function Section4() {
  const navigate = useNavigate();
  const { items: products } = useSelector((state: RootState) => state.products);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-semibold">This Month</span>
      </div>

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold tracking-wider dark:text-white">Best Selling Products</h2>
        <button onClick={() => navigate('/product')} className="bg-[#DB4444] text-white px-10 py-4 rounded-sm hover:bg-[#c23b3b] transition-colors">
          View All
        </button>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1.2}
        breakpoints={{ 768: { slidesPerView: 4 } }}
      >
        {Array.isArray(products) && products.filter(Boolean).slice(0, 4).map((product: any) => (
          <SwiperSlide key={product.id}>
            <Card3
              image={product.image || '/placeholder.png'}
              title={product.productName}
              price={`$${product.hasDiscount ? product.discountPrice : product.price}`}
              oldPrice={product.hasDiscount ? `$${product.price}` : undefined}
              rating={product.rating || 5}
              reviews={product.quantity || 0} // Используем quantity как количество отзывов, чтобы не было ошибки
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}