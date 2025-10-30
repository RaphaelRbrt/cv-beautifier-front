'use client'
import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="CVbeautifier"
      width={185}
      height={37}
      style={{ display: 'block' }}
    />
  )
}
