import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/reducers/ProductSlice'
import { getCategories } from '@/reducers/CategorySlice'
import { type AppDispatch, type RootState } from '@/store/store'
import Section1 from './Section1'
import Section3 from './Section3'
import Section5 from './Section5'
import Section2 from './Section2'
import Section4 from './Section4'
import Section6 from './Section6'
import Section7 from './Section7'
import Rectangle from '@/components/shared/Rectangle'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    // Pass the current filters to fetchProducts
    dispatch(fetchProducts(filters));
    dispatch(getCategories());
  }, [dispatch, filters]);

  return (
    <>
    <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Section7/>
      <Rectangle/>
    </div>
    </>
  )
}
