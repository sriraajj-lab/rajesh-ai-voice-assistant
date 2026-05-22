'use client'

const BASE = ''

export default function HopeGivingIllustration() {
  return (
    <div className="relative w-full min-h-[320px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0a0f0d]">
      <img
        src={`${BASE}/images/illustrations/hope-giving.png`}
        alt="Hope Giving - Social Cause"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          Hope Giving
        </span>
      </div>
    </div>
  )
}
