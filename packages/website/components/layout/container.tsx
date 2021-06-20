import React, { ReactNode } from 'react'

export default function Container(props: { children: ReactNode }) {
  return <div className='tw-container'>{props.children}</div>
}
