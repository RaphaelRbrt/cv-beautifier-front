import React from 'react'
import * as s from './styles.css'

export interface BreadcrumbItem {
  id: string
  title: string
}

export default function Breadcrumb({
  items,
  activeId,
}: {
  items: BreadcrumbItem[]
  activeId: string
}) {
  return (
    <nav className={s.breadcrumb} aria-label="Steps">
      {items.map((it) => (
        <span key={it.id} className={[s.item, it.id === activeId ? s.itemActive : ''].join(' ')}>
          {it.title}
        </span>
      ))}
    </nav>
  )
}
