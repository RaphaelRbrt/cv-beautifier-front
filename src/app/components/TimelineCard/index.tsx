'use client'
import React from 'react'
import Image from 'next/image'
import * as s from './styles.css'
import { TimelineCardProps } from '@/types'

export default function TimelineCard({
  logo,
  title,
  subtitle,
  subtitleExtra,
  location,
  startDate,
  endDate,
  isCurrent,
  description,
  keywords,
  isFirst = false,
  isLast = false,
  onEdit,
  onDelete,
  showDuration = false,
}: TimelineCardProps) {
  // Format dates
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const [year, month] = dateStr.split('-')
    const months = [
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juil.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ]
    return `${months[parseInt(month) - 1]} ${year}`
  }

  const calculateDuration = () => {
    if (!startDate) return ''
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) {
      return `${remainingMonths} mois`
    } else if (remainingMonths === 0) {
      return `${years} an${years > 1 ? 's' : ''}`
    } else {
      return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`
    }
  }

  const dateRange = startDate
    ? `${formatDate(startDate)} - ${isCurrent ? "aujourd'hui" : endDate ? formatDate(endDate) : ''}${showDuration ? ` · ${calculateDuration()}` : ''}`
    : ''

  return (
    <div className={s.timelineWrapper}>
      {!isFirst && <div className={s.timelineLine} />}

      <div className={s.timelineCard}>
        <div className={s.timelineDot} />

        <div className={s.cardContent}>
          {(onEdit || onDelete) && (
            <div className={s.actionsContainer}>
              {onEdit && (
                <button onClick={onEdit} className={s.actionButton} title="Modifier">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button onClick={onDelete} className={s.deleteButton} title="Supprimer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {logo && (
            <div className={s.logoContainer}>
              <Image
                src={logo}
                alt={subtitle}
                className={s.logo}
                width={48}
                height={48}
                unoptimized
              />
            </div>
          )}

          <div className={s.infoContainer}>
            <h3 className={s.title}>{title}</h3>

            <div className={s.subtitleLine}>
              <span className={s.subtitle}>{subtitle}</span>
              {subtitleExtra && (
                <>
                  <span className={s.separator}>·</span>
                  <span className={s.subtitleExtra}>{subtitleExtra}</span>
                </>
              )}
            </div>

            {dateRange && (
              <div className={s.metaLine}>
                <span className={s.date}>{dateRange}</span>
              </div>
            )}

            {location && (
              <div className={s.locationLine}>
                <span className={s.location}>{location}</span>
              </div>
            )}

            {description && (
              <>
                {Array.isArray(description) ? (
                  <ul className={s.descriptionList}>
                    {description.map((item, idx) => {
                      // Check if item starts with "— " followed by uppercase letter
                      const hasDashPrefix = /^—\s+[A-ZÀÂÄÇÉÈÊËÏÎÔÙÛÜŸÆŒ]/.test(item)
                      const displayText = hasDashPrefix ? item.replace(/^—\s+/, '') : item
                      const itemClass = hasDashPrefix
                        ? s.descriptionItemWithDash
                        : s.descriptionItem

                      return (
                        <li key={idx} className={itemClass}>
                          {displayText}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className={s.descriptionText}>{description}</p>
                )}
              </>
            )}

            {keywords && keywords.length > 0 && (
              <div className={s.keywordsContainer}>
                {keywords.map((keyword, idx) => (
                  <span key={idx} className={s.keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isLast && <div className={s.timelineConnector} />}
    </div>
  )
}
