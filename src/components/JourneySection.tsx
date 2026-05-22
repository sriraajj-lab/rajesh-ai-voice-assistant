'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import {
  ChildhoodIllustration,
  SainikIllustration,
  GraduationIllustration,
  SutherlandIllustration,
  KnoahIllustration,
  DirectorIllustration,
  DenialDoctorIllustration,
  AuthorIllustration,
  HopeGivingIllustration,
} from './illustrations'

interface StatItem {
  label: string
  value: string
}

interface JourneySectionProps {
  id: string
  index?: number
  yearMarker: string
  title: string
  subtitle?: string
  quote?: string
  content: string[]
  stats?: StatItem[]
  tags?: string[]
  atmosphere?: 'warm' | 'disciplined' | 'celebratory' | 'hustle' | 'growth' | 'leadership' | 'futuristic' | 'literary' | 'compassionate'
  link?: { url: string; label: string }
}

const atmosphereStyles: Record<string, { gradient: string; glow: string; accent: string }> = {
  warm: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(196, 148, 58, 0.04)',
    accent: 'text-[#e5b94e]',
  },
  disciplined: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(139, 105, 20, 0.05)',
    accent: 'text-[#d4a843]',
  },
  celebratory: {
    gradient: 'from-[#0a0a0f] via-[#111827] to-[#0a0a0f]',
    glow: 'rgba(229, 185, 78, 0.04)',
    accent: 'text-[#e5b94e]',
  },
  hustle: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(196, 148, 58, 0.03)',
    accent: 'text-[#d4a843]',
  },
  growth: {
    gradient: 'from-[#0a0a0f] via-[#111827] to-[#0a0a0f]',
    glow: 'rgba(212, 168, 67, 0.04)',
    accent: 'text-[#c4943a]',
  },
  leadership: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(196, 148, 58, 0.05)',
    accent: 'text-[#e5b94e]',
  },
  futuristic: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(229, 185, 78, 0.03)',
    accent: 'text-[#e5b94e]',
  },
  literary: {
    gradient: 'from-[#0a0a0f] via-[#111827] to-[#0a0a0f]',
    glow: 'rgba(196, 148, 58, 0.04)',
    accent: 'text-[#d4a843]',
  },
  compassionate: {
    gradient: 'from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]',
    glow: 'rgba(34, 197, 94, 0.05)',
    accent: 'text-[#4ade80]',
  },
}

const illustrationMap: Record<string, React.ComponentType> = {
  berhampur: ChildhoodIllustration,
  sainik: SainikIllustration,
  graduation: GraduationIllustration,
  sutherland: SutherlandIllustration,
  knoah: KnoahIllustration,
  dharma: DirectorIllustration,
  'denial-doctor': DenialDoctorIllustration,
  author: AuthorIllustration,
  'hope-giving': HopeGivingIllustration,
}

export default function JourneySection({
  id,
  yearMarker,
  title,
  subtitle,
  quote,
  content,
  stats,
  tags,
  atmosphere = 'warm',
  link,
}: JourneySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const style = atmosphereStyles[atmosphere]
  const Illustration = illustrationMap[id] || ChildhoodIllustration

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen py-16 md:py-24 bg-gradient-to-b ${style.gradient}`}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${style.glow} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Year marker */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#c4943a]/60 to-transparent" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#c4943a]/80">
            {yearMarker}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#c4943a]/20 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c4943a]/10 via-[#c4943a]/5 to-[#c4943a]/10 rounded-2xl blur-sm group-hover:from-[#c4943a]/15 group-hover:via-[#c4943a]/10 group-hover:to-[#c4943a]/15 transition-all duration-700" />
              <div className="relative rounded-2xl overflow-hidden border border-[#c4943a]/10 journey-card">
                <Illustration />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold ${style.accent} gold-text-glow mb-2`}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="text-[#a3a3a3] font-mono text-sm sm:text-base mb-6"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Quote */}
            {quote && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="relative pl-6 border-l-2 border-[#c4943a]/30 mb-6"
              >
                <Quote className="absolute -left-3 -top-1 w-5 h-5 text-[#c4943a]/40 bg-[#0a0a0f]" />
                <p className="text-[#f5f5f5]/80 italic text-sm sm:text-base leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </motion.div>
            )}

            {/* Content paragraphs */}
            <div className="space-y-3 mb-6">
              {content.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                className="grid grid-cols-2 gap-3 mb-6"
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#111827]/50 border border-[#c4943a]/10 rounded-lg p-3 sm:p-4 text-center journey-card"
                  >
                    <p className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-[#c4943a] gold-text-glow">
                      {stat.value}
                    </p>
                    <p className="text-[#a3a3a3] text-xs sm:text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                className="flex flex-wrap gap-2"
              >
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono tracking-wider uppercase border border-[#c4943a]/20 rounded-full text-[#c4943a]/70 bg-[#c4943a]/5"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Link Button */}
            {link && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                className="mt-6"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#4ade80]/40 rounded-full text-[#4ade80] hover:bg-[#4ade80]/10 transition-all duration-500 hover:border-[#4ade80]/70 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] font-mono text-sm tracking-wider uppercase"
                >
                  <span>{link.label}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4943a]/10 to-transparent" />
    </section>
  )
}
