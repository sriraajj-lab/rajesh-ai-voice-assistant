'use client'

import { motion } from 'framer-motion'

const BASE = ''

export default function HeroPortrait() {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(196,148,58,0.15) 0%, rgba(196,148,58,0.03) 40%, transparent 65%)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-3 rounded-full border-2 border-[#c4943a]/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#c4943a]/30"
            style={{
              left: '50%', top: -3,
              transformOrigin: '0 50%',
              transform: `rotate(${i * 45}deg) translateY(0)`,
            }}
          />
        ))}
      </motion.div>

      {/* Inner circle - cartoon portrait */}
      <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-[#c4943a]/25 bg-[#0d1117]">
        <motion.img
          src={`${BASE}/images/illustrations/hero-portrait.png`}
          alt="Rajesh Kantubhukta"
          className="w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute -top-2 -right-2 w-14 h-14 border-t-2 border-r-2 border-[#c4943a]/25 rounded-tr-3xl" />
      <div className="absolute -bottom-2 -left-2 w-14 h-14 border-b-2 border-l-2 border-[#c4943a]/25 rounded-bl-3xl" />

      {/* Pulsing dot indicators */}
      <motion.div
        className="absolute top-2 right-8 w-2 h-2 rounded-full bg-[#c4943a]/40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-[#e5b94e]/30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}
