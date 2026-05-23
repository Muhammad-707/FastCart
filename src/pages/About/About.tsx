import React from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Rectangle from '@/components/shared/Rectangle'

export default function About() {
  return (
    <>
    <div className='mt-[-40px]'>
      <Section1/>
      <Section2/>
      <Section3/>
      <Rectangle/>
    </div>
    </>
  )
}
