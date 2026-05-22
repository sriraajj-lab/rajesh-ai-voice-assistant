'use client'

import { useEffect, useState, useCallback } from 'react'

interface MobileTimelineProps {
  label: string
  year: string
}

export default function MobileTimeline({ label, year }: MobileTimelineProps) {
  return (
    <div className="lg:hidden flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gold timeline-dot-active" />
        <div className="h-px w-6 bg-gold/30" />
      </div>
      <span className="font-mono text-xs tracking-[0.15em] uppercase text-gold/80">
        {year}
      </span>
      <span className="font-mono text-xs text-muted-foreground/50">·</span>
      <span className="font-mono text-xs tracking-wider text-gold/60">
        {label}
      </span>
    </div>
  )
}
