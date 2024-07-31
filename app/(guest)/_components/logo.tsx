import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <Image 
        height={45}
        width={45}
        alt='logo'
        src="/logo F_design.jpg"
    />
  )
}

export default Logo