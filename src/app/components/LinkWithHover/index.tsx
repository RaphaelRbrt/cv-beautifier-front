'use client'
import React from 'react'
import Link from 'next/link'
import * as s from './styles.css'

export interface LinkWithHoverProps {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
  variant?: 'default' | 'bold'
}

export default function LinkWithHover({
  href,
  children,
  onClick,
  className,
  variant = 'default',
}: LinkWithHoverProps) {
  const linkClassName = variant === 'bold' ? s.linkBold : s.link
  const combinedClassName = className ? `${linkClassName} ${className}` : linkClassName

  return (
    <Link href={href} onClick={onClick} className={combinedClassName}>
      {children}
    </Link>
  )
}
