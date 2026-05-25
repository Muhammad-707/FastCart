import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { type RootState } from '@/store/store';
import {
  setCategory,
  setBrand,
  setPriceRange,
  setCondition,
  setRating,
  resetFilters,
  type FilterState
} from '../../reducers/FilterSlice';
import { ChevronUp, Star } from 'lucide-react';

interface Category {
  id: number;
  categoryName: string;
}

interface Brand {
  id: number;
  brandName: string;
}

const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items'];
const ratingsList = [5, 4, 3, 2];
const SLIDER_MAX = 10000;

export default function Sidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters) as FilterState;
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [minInput, setMinInput] = useState(String(filters.minPrice ?? 0));
  const [maxInput, setMaxInput] = useState(String(filters.maxPrice ?? SLIDER_MAX));

  useEffect(() => {
    axios.get('https://fastcard-1-o23z.onrender.com/api/Category/get-categories')
      .then(res => setCategories(res.data.data || []))
      .catch(err => console.error(err));

    axios.get('https://fastcard-1-o23z.onrender.com/api/Brand/get-brands?PageSize=100')
      .then(res => setBrands(res.data.data.brands || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setMinInput(String(filters.minPrice ?? 0));
    setMaxInput(String(filters.maxPrice ?? SLIDER_MAX));
  }, [filters.minPrice, filters.maxPrice]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPrice = () => {
    dispatch(setPriceRange([Number(minInput) || 0, Number(maxInput) || SLIDER_MAX]));
    scrollToTop();
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), Number(maxInput) - 100);
    setMinInput(String(value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), Number(minInput) + 100);
    setMaxInput(String(value));
  };

  const handleCategorySelect = (id: number | null) => {
    if (id) {
      searchParams.set('categoryId', String(id));
    } else {
      searchParams.delete('categoryId');
    }
    searchParams.delete('subCategory');
    setSearchParams(searchParams);
    dispatch(setCategory(id));
    scrollToTop();
  };

  const handleBrandSelect = (id: number | null) => {
    dispatch(setBrand(id));
    scrollToTop();
  };

  const handleConditionSelect = (cond: string) => {
    dispatch(setCondition(cond));
    scrollToTop();
  };

  const handleRatingSelect = (stars: number | null) => {
    dispatch(setRating(stars));
    scrollToTop();
  };

  const handleResetAll = () => {
    dispatch(resetFilters());
    setMinInput('0');
    setMaxInput(String(SLIDER_MAX));
    setSearchParams(new URLSearchParams());
    scrollToTop();
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-2 flex flex-col font-sans text-black dark:text-zinc-100 transition-colors duration-200">
      <div>
        <div className="flex items-center justify-between py-2 text-base font-medium border-b border-gray-100 dark:border-zinc-800 mb-4">
          <span>Filters</span>
          <button
            onClick={handleResetAll}
            className="text-xs text-gray-400 dark:text-zinc-500 hover:text-[#DB4444] transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-semibold mb-3 cursor-pointer">
          <span>Category</span>
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <ul className="space-y-2.5 text-sm">
          <li
            onClick={() => handleCategorySelect(null)}
            className={`cursor-pointer transition-colors ${!filters.categoryId ? 'text-[#DB4444] font-medium' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
          >
            All products
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`cursor-pointer transition-colors ${filters.categoryId === cat.id ? 'text-[#DB4444] font-medium' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}
            >
              {cat.categoryName}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800 my-4"></div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-semibold mb-3 cursor-pointer">
          <span>Brands</span>
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <ul className="space-y-2.5">
          <li className="flex items-center gap-3 text-sm">
            <input
              type="radio"
              name="brand-group"
              id="brand-all"
              checked={!filters.brandId}
              onChange={() => handleBrandSelect(null)}
              className="w-4 h-4 border-gray-300 dark:border-zinc-700 text-[#DB4444] focus:ring-[#DB4444] accent-[#DB4444] bg-transparent cursor-pointer"
            />
            <label htmlFor="brand-all" className="text-gray-600 dark:text-zinc-400 cursor-pointer select-none flex-1 hover:text-black dark:hover:text-white">
              All Brands
            </label>
          </li>
          {brands.map((brand) => (
            <li key={brand.id} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="brand-group"
                id={`brand-${brand.id}`}
                checked={filters.brandId === brand.id}
                onChange={() => handleBrandSelect(brand.id)}
                className="w-4 h-4 border-gray-300 dark:border-zinc-700 text-[#DB4444] focus:ring-[#DB4444] accent-[#DB4444] bg-transparent cursor-pointer"
              />
              <label htmlFor={`brand-${brand.id}`} className="text-gray-600 dark:text-zinc-400 cursor-pointer select-none flex-1 hover:text-black dark:hover:text-white">
                {brand.brandName}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800 my-4"></div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-semibold mb-4 cursor-pointer">
          <span>Price range</span>
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        
        <div className="px-1 mb-5 relative h-1 w-full bg-gray-200 dark:bg-zinc-800 rounded mt-4">
          <div
            className="absolute h-full bg-[#DB4444] rounded"
            style={{
              left: `${(Number(minInput) / SLIDER_MAX) * 100}%`,
              right: `${100 - (Number(maxInput) / SLIDER_MAX) * 100}%`
            }}
          ></div>
          <input
            type="range"
            min="0"
            max={SLIDER_MAX}
            value={minInput}
            onChange={handleMinChange}
            className="absolute w-full -top-0.3 h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-zinc-900 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#DB4444] [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#DB4444] [&::-moz-range-thumb]:rounded-full"
          />
          <input
            type="range"
            min="0"
            max={SLIDER_MAX}
            value={maxInput}
            onChange={handleMaxChange}
            className="absolute w-full -top-0.3 h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-zinc-900 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#DB4444] [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#DB4444] [&::-moz-range-thumb]:rounded-full"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 border border-gray-300 dark:border-zinc-700 rounded px-3 py-1.5 bg-transparent">
            <span className="block text-[10px] text-gray-400 dark:text-zinc-500 uppercase leading-none mb-0.5">Min</span>
            <input
              type="number"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-full border-none p-0 text-sm bg-transparent focus:ring-0 outline-none text-gray-700 dark:text-zinc-300"
            />
          </div>
          <div className="flex-1 border border-gray-300 dark:border-zinc-700 rounded px-3 py-1.5 bg-transparent">
            <span className="block text-[10px] text-gray-400 dark:text-zinc-500 uppercase leading-none mb-0.5">Max</span>
            <input
              type="number"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-full border-none p-0 text-sm bg-transparent focus:ring-0 outline-none text-gray-700 dark:text-zinc-300"
            />
          </div>
        </div>

        <button
          onClick={handleApplyPrice}
          className="w-full py-2 border border-[#DB4444] text-[#DB4444] rounded text-sm font-medium hover:bg-[#DB4444] hover:text-white transition-all bg-transparent"
        >
          Apply
        </button>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800 my-4"></div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-semibold mb-3 cursor-pointer">
          <span>Condition</span>
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <ul className="space-y-2.5">
          {conditions.map((cond) => (
            <li key={cond} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                name="condition-group"
                id={`cond-${cond}`}
                checked={filters.condition === cond}
                onChange={() => handleConditionSelect(cond)}
                className="w-4 h-4 border-gray-300 dark:border-zinc-700 text-[#DB4444] focus:ring-[#DB4444] accent-[#DB4444] bg-transparent cursor-pointer"
              />
              <label htmlFor={`cond-${cond}`} className="text-gray-600 dark:text-zinc-400 cursor-pointer select-none flex-1 hover:text-black dark:hover:text-white">
                {cond}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800 my-4"></div>

      <div className="mb-2">
        <div className="flex items-center justify-between text-sm font-semibold mb-3 cursor-pointer">
          <span>Ratings</span>
          <ChevronUp size={16} className="text-gray-400" />
        </div>
        <ul className="space-y-2.5">
          {ratingsList.map((starsCount) => (
            <li key={starsCount} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`rating-${starsCount}`}
                checked={filters.rating === starsCount}
                onChange={() => handleRatingSelect(filters.rating === starsCount ? null : starsCount)}
                className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-[#DB4444] focus:ring-[#DB4444] accent-[#DB4444] bg-transparent cursor-pointer"
              />
              <label htmlFor={`rating-${starsCount}`} className="flex items-center gap-0.5 cursor-pointer select-none flex-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={index < starsCount ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-200 dark:fill-zinc-800 text-gray-200 dark:text-zinc-800"}
                  />
                ))}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}