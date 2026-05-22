'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ParticleField from './ParticleField'
import { HeroPortrait } from './illustrations'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = '16 Years Transforming US Healthcare RCM Through AI-Driven Solutions'

  const handleTypewriter = useCallback(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setIsTypingComplete(true)
      }
    }, 40)
    return timer
  }, [])

  useEffect(() => {
    const timer = handleTypewriter()
    return () => clearInterval(timer)
  }, [handleTypewriter])

  const scrollToJourney = () => {
    const el = document.getElementById('journey-start')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,148,58,0.06)_0%,transparent_70%)]" />
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-[#e5b94e] font-mono text-sm sm:text-base tracking-[0.3em] uppercase mb-4 opacity-80">
              Director · Builder · Author
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#c4943a] gold-text-glow tracking-tight"
          >
            RAJESH
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#f5f5f5]/80 mt-2 tracking-wide">
              Kantubhukta
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <p className="text-[#d4a843] text-base sm:text-lg md:text-xl mt-6 font-mono">
              Director of Revenue Cycle Operations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mt-6 min-h-[3rem]"
          >
            <p className="text-[#a3a3a3] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {displayText}
              <span className="typewriter-cursor text-[#c4943a]">
                |
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            className="mt-10"
          >
            <button
              onClick={scrollToJourney}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-[#c4943a]/40 rounded-full text-[#c4943a] hover:bg-[#c4943a]/10 transition-all duration-500 hover:border-[#c4943a]/70 hover:shadow-[0_0_30px_rgba(196,148,58,0.15)]"
            >
              <span className="font-mono text-sm tracking-wider uppercase">
                Explore My Journey
              </span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Right: Animated Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <HeroPortrait />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#c4943a]/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-[#c4943a]/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
