'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCharacter from './illustrations/AnimatedCharacter'

interface TimelineStage {
  id: string
  label: string
  year: string
  age: 'child' | 'teen' | 'young' | 'early-career' | 'mid-career' | 'director' | 'builder' | 'author'
}

const stages: TimelineStage[] = [
  { id: 'berhampur', label: 'Roots', year: '1980s', age: 'child' },
  { id: 'sainik', label: 'Forging', year: '1990s', age: 'teen' },
  { id: 'graduation', label: 'Foundation', year: '2005', age: 'young' },
  { id: 'sutherland', label: 'First Steps', year: '2005-07', age: 'early-career' },
  { id: 'knoah', label: 'Building', year: '2007-10', age: 'mid-career' },
  { id: 'dharma', label: 'Director', year: '2010+', age: 'director' },
  { id: 'denial-doctor', label: 'Builder', year: '2024+', age: 'builder' },
  { id: 'author', label: 'Author', year: '2026', age: 'author' },
]

export default function LeftTimeline() {
  const [activeStage, setActiveStage] = useState(0)

  const handleScroll = useCallback(() => {
    const sectionIds = stages.map((s) => s.id)
    let current = 0

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          current = i
          break
        }
      }
    }

    setActiveStage(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    const rafId = requestAnimationFrame(() => { handleScroll() })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [handleScroll])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="hidden lg:flex sticky top-0 h-screen w-[30%] max-w-[360px] flex-col items-center justify-center py-8">
      {/* Active stage anime character - large behind timeline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="opacity-[0.06]"
          >
            <AnimatedCharacter age={stages[activeStage].age} pose="standing" className="w-52 h-auto" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Small character preview above timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-6"
        >
          <div className="w-20 h-auto flex items-center justify-center">
            <AnimatedCharacter age={stages[activeStage].age} pose="standing" className="w-16 h-auto" />
          </div>
          <div className="text-center mt-1">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4943a]/40">
              {stages[activeStage].label}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Timeline vertical line and dots */}
      <div className="relative z-10 flex flex-col items-center gap-0">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex flex-col items-center">
            {/* Vertical line segment */}
            {i > 0 && (
              <div className="relative w-px h-8">
                <div className="absolute inset-0 bg-[#c4943a]/10" />
                <motion.div
                  className="absolute top-0 left-0 right-0 bg-[#c4943a]/50"
                  initial={false}
                  animate={{ height: i <= activeStage ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}

            {/* Dot */}
            <button
              onClick={() => scrollToSection(stage.id)}
              className="group relative flex items-center gap-3 cursor-pointer"
              aria-label={`Navigate to ${stage.label} section`}
            >
              <div className="relative">
                <motion.div
                  className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    i === activeStage
                      ? 'border-[#c4943a] bg-[#c4943a] timeline-dot-active'
                      : i < activeStage
                        ? 'border-[#c4943a]/50 bg-[#c4943a]/50'
                        : 'border-[#c4943a]/20 bg-transparent'
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
                {i === activeStage && (
                  <motion.div
                    layoutId="timeline-ring"
                    className="absolute -inset-2 rounded-full border border-[#c4943a]/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-start">
                <span
                  className={`font-mono text-xs tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    i === activeStage ? 'text-[#c4943a]' : 'text-[#a3a3a3]/50'
                  } group-hover:text-[#c4943a]/80`}
                >
                  {stage.label}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    i === activeStage ? 'text-[#c4943a]/60' : 'text-[#a3a3a3]/30'
                  }`}
                >
                  {stage.year}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
