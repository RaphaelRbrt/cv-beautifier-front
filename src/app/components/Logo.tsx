'use client'
import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="CVbeautifier"
      width={180}
      height={40}
      style={{ display: 'block' }}
    />
  )
}
