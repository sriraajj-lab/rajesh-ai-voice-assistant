'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, Heart } from 'lucide-react'

export default function ConnectFooter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer
      ref={ref}
      id="connect"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(196,148,58,0.04)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">
            Connect
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-gold gold-text-glow mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Whether it&apos;s fixing a broken revenue cycle, architecting an AI solution, or writing the next chapter — I&apos;m always open to meaningful conversations.
          </p>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          <a
            href="mailto:sriraajj@gmail.com"
            className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              sriraajj@gmail.com
            </span>
          </a>

          <a
            href="tel:+919000111537"
            className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              +91 9000111537
            </span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://linkedin.com/in/rajesh-kantubhukta"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/aria-agentworks"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-300"
          >
            <Github className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              AgentWorks
            </span>
          </a>

          <a
            href="https://github.com/sriraajj-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-gold/15 hover:border-gold/30 bg-navy-light/30 hover:bg-navy-light/50 transition-all duration-300"
          >
            <Github className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Lab
            </span>
          </a>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="border-t border-gold/10 pt-10"
        >
          <div className="relative pl-6 border-l-2 border-gold/20 inline-block text-left">
            <p className="text-foreground/70 italic text-sm sm:text-base">
              &ldquo;Fix what&apos;s broken. Leave things better than you found them.&rdquo;
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/40">
            <Heart className="w-3 h-3 text-gold/30" />
            <span className="text-xs font-mono tracking-wider">
              Hope Giving Society Supporter
            </span>
          </div>

          <p className="mt-6 text-xs text-muted-foreground/30 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} Rajesh Kantubhukta. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
