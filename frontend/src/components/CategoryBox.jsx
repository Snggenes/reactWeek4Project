import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CategoryBox({ label, icon }) {
    const navigate= useNavigate();
    const handleClick = () => {
        navigate(`/cars/${label.toLowerCase()}`)
    }
  return (
    <div className="flex flex-col items-center cursor-pointer"
    onClick={handleClick}>
      {icon && <img src={icon} className='h-4' />}
      <p>{label}</p>
    </div>
  )
}
