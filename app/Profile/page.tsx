
import ReservationCards from '@/components/costumeInputs/ReservationCards'
import React from 'react'

export default function Profile() {
  return (
    <section
    className='w-full h-full text-gray-700'
    >
        <div className='border lg:border-none'></div>
        <div className='flex flex-col justify-center items-center gap-3 py-8 md:grid md:grid-cols-2 md:px-5 
        lg:grid-cols-3'>
            <ReservationCards />
            <ReservationCards />
            <ReservationCards />
            <ReservationCards />
            <ReservationCards />
            <ReservationCards />
            <ReservationCards />
        </div>
    </section>
  )
}
