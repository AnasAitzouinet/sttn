import React, { Suspense } from 'react'
import Home from './Home'
import Loader from '@/components/loader'

export default function page() {
  return (
    <Suspense fallback={<Loader/>}>
      <Home />
    </Suspense>
  )
}
