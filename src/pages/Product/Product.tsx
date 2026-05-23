"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/reducers/ProductSlice';
import { type RootState, type AppDispatch } from '@/store/store';

// ВМЕСТО @/reducers/FilterSlice — используй относительный путь
// Если файл лежит в src/reducers/FilterSlice.ts, а ProductPage в src/pages/Product/ProductPage.tsx
// Тебе нужно подняться на 2 уровня вверх:
import { type FilterState } from '../../reducers/FilterSlice'; 

import Card1 from '@/pages/Product/Card1';
import Sidebar from '@/pages/Product/Sidebar';

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Достаем данные из Redux стора
  const { items, loading } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters as FilterState);
  
  // Состояние для количества отображаемых товаров
  const [visibleCount, setVisibleCount] = useState(9);

  // Загружаем товары при каждом изменении фильтров
  useEffect(() => {
    dispatch(fetchProducts(filters));
    setVisibleCount(9); // Сбрасываем счетчик при смене фильтров
  }, [dispatch, filters]);

  // Функция для отображения большего количества товаров
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Боковая панель фильтров */}
        <aside className="w-full md:w-64 shrink-0">
          <Sidebar />
        </aside>

        {/* Сетка товаров */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center py-20 text-lg font-medium">Загрузка товаров...</div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="text-center py-20">Товары не найдены по заданным фильтрам.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.slice(0, visibleCount).map((product) => (
                    <Card1 
                      key={product.id}
                      image={product.image} 
                      title={product.productName} 
                      price={`$${product.price}`}
                      reviews={0} // Передай реальный рейтинг, если есть
                    />
                  ))}
                </div>
              )}

              {/* Кнопка More, отображается, если есть еще скрытые товары */}
              {visibleCount < items.length && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-[#DB4444] text-white rounded-md hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    More Products
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}