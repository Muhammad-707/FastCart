import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useWishlist } from "@/pages/Wishlist/WishlistContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// Импорт экшена (убедитесь, что имя функции совпадает с экспортом из ProductSlice)
import { fetchProducts } from "@/reducers/ProductSlice"; 
import type { RootState, AppDispatch } from "@/store/store";

import Card1 from './Card1';
import Card2 from './Card2';

export default function Wishlist() {
    const navigate = useNavigate();
    const { wishlist = [] } = useWishlist();
    const dispatch = useDispatch<AppDispatch>();

    const [localWishlist, setLocalWishlist] = useState<any[]>([]);

    const syncWishlist = () => {
        const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setLocalWishlist(saved);
    };

    useEffect(() => {
        syncWishlist();
        window.addEventListener('wishlist-updated', syncWishlist);
        return () => {
            window.removeEventListener('wishlist-updated', syncWishlist);
        };
    }, [wishlist]);

    // ИСПРАВЛЕНО: Типизация селектора
    // Убедитесь, что state.products существует в вашем RootState
    const { items, products, loading, isLoading } = useSelector((state: RootState) => state.products);

    const recommendedProducts = Array.isArray(items)
        ? items
        : Array.isArray(products)
            ? products
            : [];

    const isDataLoading = loading || isLoading;

    useEffect(() => {
        // Вызываем экшен для загрузки товаров
        dispatch(fetchProducts({}));
    }, [dispatch]);

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-20 pt-10 pb-20 font-sans">
            {/* СЕКЦИЯ WISHLIST */}
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-normal text-black dark:text-white tracking-wide">
                    Wishlist ({localWishlist.length})
                </h2>
                <button className="border border-black/30 dark:border-white/30 text-black dark:text-white px-12 py-4 rounded-[4px] font-medium text-base hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    Move All To Bag
                </button>
            </div>

            <div className="mb-20">
                <div className="hidden md:grid grid-cols-4 gap-[30px]">
                    {localWishlist.map((item: any) => (
                        <Card1 key={item.id || item._id || item.title} product={item} />
                    ))}
                </div>
                <div className="md:hidden">
                    <Swiper slidesPerView={1.3} spaceBetween={20}>
                        {localWishlist.map((item: any) => (
                            <SwiperSlide key={item.id || item._id || item.title}>
                                <Card1 product={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* СЕКЦИЯ JUST FOR YOU */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]"></div>
                    <h2 className="text-xl font-normal text-black dark:text-white tracking-wide">
                        Just For You
                    </h2>
                </div>
                <button onClick={() => navigate('/product')} className="border border-black/30 dark:border-white/30 text-black dark:text-white px-12 py-4 rounded-[4px] font-medium text-base hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    See All
                </button>
            </div>

            <div className="w-full">
                {isDataLoading && recommendedProducts.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-zinc-500 text-sm font-medium">Загрузка рекомендуемых товаров...</p>
                    </div>
                ) : recommendedProducts.length > 0 ? (
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1.3}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="products-swiper"
                    >
                        {recommendedProducts.map((item: any) => (
                            <SwiperSlide key={item.id || item._id}>
                                <Card2 product={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-zinc-500 text-center py-10">Нет доступных рекомендаций</p>
                )}
            </div>
        </div>
    );
}