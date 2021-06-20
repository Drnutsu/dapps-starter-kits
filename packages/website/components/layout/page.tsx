import React, { ReactNode } from 'react'
import Navbar from 'components/layout/navbar'

export default function Page(props: { children: ReactNode }) {
  return (
    <div className='container mx-auto p-10'>
      <Navbar />
      <div className='py-6'>{props.children}</div>
    </div>
  )
}
