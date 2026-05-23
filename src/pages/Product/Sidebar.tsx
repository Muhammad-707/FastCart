"use client";

import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import { setPriceRange, type FilterState } from '@/reducers/FilterSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  
  // Явно приводим состояние к FilterState, чтобы исчезли ошибки ts(2339)
  const filters = useSelector((state: RootState) => state.filters) as FilterState;

  const handlePriceChange = (min: number, max: number) => {
    // Отправляем массив [min, max] в Redux
    dispatch(setPriceRange([min, max]));
  };

  return (
    <div className="flex flex-col gap-8 p-4 border border-gray-200 rounded-lg bg-white">
      {/* Секция Цены */}
      <div>
        <h3 className="font-bold mb-3">Price range</h3>
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            className="w-full border p-2 rounded"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value), filters.maxPrice)}
          />
          <input 
            type="number" 
            placeholder="Max" 
            className="w-full border p-2 rounded"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
          />
        </div>
      </div>

      {/* Другие секции можно добавлять аналогично */}
      <div>
        <h3 className="font-bold mb-3">Category</h3>
        <ul className="text-gray-600 space-y-2">
          <li>All products</li>
          <li>Electronics</li>
        </ul>
      </div>
    </div>
  );
}