'use client'
import React from 'react'

interface BreadcrumbItem {
  id: string
  title: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  activeId: string
}

export default function Breadcrumb({ items, activeId }: BreadcrumbProps) {
  const activeIdx = items.findIndex((item) => item.id === activeId)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0' }}>
      {items.map((item, idx) => {
        const isActive = item.id === activeId
        const isCompleted = idx < activeIdx

        return (
          <React.Fragment key={item.id}>
            {/* Step circle and label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Circle with number */}
              <div
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                  backgroundColor: isActive || isCompleted ? '#91C3EB' : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive || isCompleted ? '#F5FAFA' : '#9CA3AF',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                {idx + 1}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#F5FAFA' : 'rgba(245, 250, 250, 0.6)',
                  transition: 'all 0.3s ease',
                }}
              >
                {item.title}
              </div>
            </div>

            {/* Connector line (dash) */}
            {idx < items.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: 'rgba(245, 250, 250, 0.3)',
                  borderRadius: 1,
                }}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
