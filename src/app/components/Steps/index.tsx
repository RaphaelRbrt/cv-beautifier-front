'use client'
import React, { useMemo, useState } from 'react'
import * as s from './styles.css'
import Breadcrumb from './Breadcrumb'
import Step from './Step'
import type { StepConfig } from './types'

export function Steps({ steps }: { steps: StepConfig[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [context, setContext] = useState<Record<string, unknown>>({})

  const activeId = steps[activeIdx]?.id

  const items = useMemo(() => steps.map((step) => ({ id: step.id, title: step.title })), [steps])

  const onNext = (data?: unknown) => {
    if (data && typeof data === 'object') setContext((prev) => ({ ...prev, ...data }))
    setActiveIdx((i) => Math.min(i + 1, steps.length - 1))
  }
  const onPrev = () => setActiveIdx((i) => Math.max(i - 1, 0))

  return (
    <div className={s.stepsContainer}>
      <div className={s.header}>
        <Breadcrumb items={items} activeId={activeId} />
      </div>
      <div className={s.stepArea}>
        {steps.map((cfg, idx) => (
          <div key={cfg.id} className={s.stepInner}>
            <Step isActive={idx === activeIdx} onNext={onNext} onPrev={onPrev} context={context}>
              {cfg.render({ isActive: idx === activeIdx, onNext, onPrev, context })}
            </Step>
          </div>
        ))}
      </div>
    </div>
  )
}
