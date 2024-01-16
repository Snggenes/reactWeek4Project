import React from 'react'

export default function Heading({title, subtitle, secondSubtitle, thirdSubtitle, center}) {
  return (
    <div className='text-start pl-6'>
        <div className= {center ? 'text-center text-2xl font-bold' : 'text-2xl font-bold'}>
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-1">
            {subtitle}
        </div>
        <div className="font-light text-neutral-500 mt-1">
            {secondSubtitle}
        </div>
        <div className="font-light text-neutral-500 mt-1">
            {thirdSubtitle}
        </div>
    </div>
  )
}
