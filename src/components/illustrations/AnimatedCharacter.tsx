'use client'

import { motion } from 'framer-motion'

/**
 * Cartoon/anime-style consistent animated character for Rajesh at different life stages.
 * Inspired by Detective Conan / classic anime style:
 * - Chibi proportions (large head, ~1:3 head-to-body ratio)
 * - Big expressive eyes with detailed iris/highlights
 * - Bold black outlines (2-3px stroke)
 * - Vibrant flat colors with minimal shading
 * - Age-appropriate appearance (child → 42-year-old, never looks older)
 */

interface CharacterProps {
  age: 'child' | 'teen' | 'young' | 'early-career' | 'mid-career' | 'director' | 'builder' | 'author'
  className?: string
  pose?: 'standing' | 'walking' | 'sitting' | 'celebrating' | 'presenting' | 'writing'
}

/* Vibrant cartoon color palette */
const C = {
  skin: '#E8B88A',
  skinDark: '#D4A070',
  skinLight: '#F0C8A0',
  skinShadow: '#C09060',
  hair: '#1a1a2e',
  hairLight: '#2d2d4a',
  eyeWhite: '#FFFFFF',
  eyeIris: '#3d2b1f',
  eyeIrisLight: '#7B5C4B',
  eyePupil: '#000000',
  eyeHighlight: '#FFFFFF',
  eyeHighlight2: '#FFFFFF',
  outline: '#1a1a2e',
  outlineMed: '#2a2a3e',
  lipColor: '#D08070',
  blushPink: '#FFB0A0',
  shirtWhite: '#F0F0F5',
  shirtBlue: '#3B5998',
  shirtBlueLight: '#4A6DB5',
  shirtYellow: '#F5D040',
  pantsDark: '#2A2A3E',
  pantsNavy: '#1E2A4A',
  pantsKhaki: '#8B7D5A',
  blazerNavy: '#1A2540',
  blazerDark: '#1a1a2e',
  tie: '#9B1B1B',
  tieGold: '#C4943A',
  gold: '#C4943A',
  goldLight: '#E5B94E',
  uniformKhaki: '#A89060',
  uniformKhakiDark: '#8B7A50',
  capColor: '#2A2A3E',
  gownBlack: '#1A1A28',
  shoesBlack: '#1a1a2e',
  shoesBrown: '#5A4030',
  sareeRed: '#9B2040',
  sareeGold: '#D4A843',
}

/* Age configurations - chibi proportions (head is ~1/3 of total height) */
const ageConfig = {
  child: {
    totalH: 140, headCX: 60, headCY: 48,
    headRX: 28, headRY: 30,
    eyeW: 10, eyeH: 12, eyeY: 46,
    noseY: 58, mouthY: 63,
    neckLen: 6, shoulderW: 40,
    torsoLen: 28, hipW: 30,
    legLen: 30, armLen: 24,
    hairStyle: 'child' as const,
    clothing: 'casual-kid' as const,
    blushSize: 5,
  },
  teen: {
    totalH: 160, headCX: 60, headCY: 44,
    headRX: 25, headRY: 28,
    eyeW: 9, eyeH: 11, eyeY: 42,
    noseY: 54, mouthY: 58,
    neckLen: 8, shoulderW: 48,
    torsoLen: 36, hipW: 34,
    legLen: 38, armLen: 30,
    hairStyle: 'military' as const,
    clothing: 'cadet' as const,
    blushSize: 4,
  },
  young: {
    totalH: 170, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 9, eyeH: 10, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 8, shoulderW: 50,
    torsoLen: 40, hipW: 36,
    legLen: 44, armLen: 32,
    hairStyle: 'young-adult' as const,
    clothing: 'graduation' as const,
    blushSize: 3,
  },
  'early-career': {
    totalH: 175, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 8, eyeH: 10, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 9, shoulderW: 52,
    torsoLen: 42, hipW: 38,
    legLen: 46, armLen: 34,
    hairStyle: 'young-adult' as const,
    clothing: 'dress-shirt' as const,
    blushSize: 3,
  },
  'mid-career': {
    totalH: 178, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 8, eyeH: 9, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 9, shoulderW: 54,
    torsoLen: 44, hipW: 38,
    legLen: 48, armLen: 34,
    hairStyle: 'mature' as const,
    clothing: 'business-casual' as const,
    blushSize: 3,
  },
  director: {
    totalH: 180, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 8, eyeH: 9, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 9, shoulderW: 56,
    torsoLen: 44, hipW: 40,
    legLen: 48, armLen: 34,
    hairStyle: 'mature' as const,
    clothing: 'suit' as const,
    blushSize: 3,
  },
  builder: {
    totalH: 180, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 8, eyeH: 9, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 9, shoulderW: 56,
    torsoLen: 44, hipW: 40,
    legLen: 48, armLen: 34,
    hairStyle: 'mature' as const,
    clothing: 'smart-casual' as const,
    blushSize: 3,
  },
  author: {
    totalH: 180, headCX: 60, headCY: 42,
    headRX: 24, headRY: 27,
    eyeW: 8, eyeH: 9, eyeY: 40,
    noseY: 52, mouthY: 56,
    neckLen: 9, shoulderW: 56,
    torsoLen: 44, hipW: 40,
    legLen: 48, armLen: 34,
    hairStyle: 'mature' as const,
    clothing: 'smart-casual' as const,
    blushSize: 3,
  },
}

/* ===== ANIME EYES - Big, expressive with highlights ===== */
function AnimeEyes({ cx, y, w, h, isSmiling = false }: { cx: number; y: number; w: number; h: number; isSmiling?: boolean }) {
  const gap = 3
  const leftEX = cx - w - gap / 2
  const rightEX = cx + gap / 2
  const sw = 2.5 // stroke width for bold outlines

  return (
    <>
      {/* LEFT EYE */}
      <g>
        {/* Eye white - large oval */}
        <ellipse cx={leftEX + w / 2} cy={y} rx={w / 2 + 1} ry={h / 2 + 1}
          fill={C.eyeWhite} stroke={C.outline} strokeWidth={sw} />
        {/* Upper eyelid shadow */}
        <path d={`M${leftEX - 1} ${y - h * 0.3} Q${leftEX + w / 2} ${y - h * 0.6 - 1} ${leftEX + w + 1} ${y - h * 0.3}`}
          fill={C.skinShadow} opacity="0.3" />
        {/* Iris - large, filling most of the eye */}
        <ellipse cx={leftEX + w / 2 + 0.5} cy={y + 1} rx={w * 0.42} ry={h * 0.45}
          fill={C.eyeIris} />
        {/* Iris gradient highlight - lighter upper portion */}
        <ellipse cx={leftEX + w / 2 - 0.5} cy={y - h * 0.1} rx={w * 0.35} ry={h * 0.25}
          fill={C.eyeIrisLight} opacity="0.5" />
        {/* Pupil */}
        <circle cx={leftEX + w / 2 + 0.5} cy={y + 1} r={w * 0.16} fill={C.eyePupil} />
        {/* Main highlight - large white circle (upper-left) */}
        <circle cx={leftEX + w * 0.3} cy={y - h * 0.18} r={w * 0.2} fill={C.eyeHighlight} />
        {/* Secondary highlight - small (lower-right) */}
        <circle cx={leftEX + w * 0.65} cy={y + h * 0.2} r={w * 0.1} fill={C.eyeHighlight2} opacity="0.8" />
        {/* Bold upper eyelid line - thick, curved */}
        <path d={`M${leftEX - 2} ${y - h * 0.35} Q${leftEX + w / 2} ${y - h * 0.7} ${leftEX + w + 2} ${y - h * 0.35}`}
          stroke={C.outline} strokeWidth={sw + 0.5} fill="none" strokeLinecap="round" />
        {/* Eyelash flick on outer edge */}
        <path d={`M${leftEX + w + 2} ${y - h * 0.35} L${leftEX + w + 4} ${y - h * 0.55}`}
          stroke={C.outline} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      </g>

      {/* RIGHT EYE */}
      <g>
        <ellipse cx={rightEX + w / 2} cy={y} rx={w / 2 + 1} ry={h / 2 + 1}
          fill={C.eyeWhite} stroke={C.outline} strokeWidth={sw} />
        <path d={`M${rightEX - 1} ${y - h * 0.3} Q${rightEX + w / 2} ${y - h * 0.6 - 1} ${rightEX + w + 1} ${y - h * 0.3}`}
          fill={C.skinShadow} opacity="0.3" />
        <ellipse cx={rightEX + w / 2 + 0.5} cy={y + 1} rx={w * 0.42} ry={h * 0.45}
          fill={C.eyeIris} />
        <ellipse cx={rightEX + w / 2 - 0.5} cy={y - h * 0.1} rx={w * 0.35} ry={h * 0.25}
          fill={C.eyeIrisLight} opacity="0.5" />
        <circle cx={rightEX + w / 2 + 0.5} cy={y + 1} r={w * 0.16} fill={C.eyePupil} />
        <circle cx={rightEX + w * 0.3} cy={y - h * 0.18} r={w * 0.2} fill={C.eyeHighlight} />
        <circle cx={rightEX + w * 0.65} cy={y + h * 0.2} r={w * 0.1} fill={C.eyeHighlight2} opacity="0.8" />
        <path d={`M${rightEX - 2} ${y - h * 0.35} Q${rightEX + w / 2} ${y - h * 0.7} ${rightEX + w + 2} ${y - h * 0.35}`}
          stroke={C.outline} strokeWidth={sw + 0.5} fill="none" strokeLinecap="round" />
        {/* Left eyelash flick */}
        <path d={`M${rightEX - 2} ${y - h * 0.35} L${rightEX - 4} ${y - h * 0.55}`}
          stroke={C.outline} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      </g>

      {/* EYEBROWS - thick, expressive */}
      <path d={`M${leftEX - 2} ${y - h * 0.75} Q${leftEX + w / 2} ${y - h * 1.2} ${leftEX + w + 2} ${y - h * 0.7}`}
        stroke={C.outline} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M${rightEX - 2} ${y - h * 0.7} Q${rightEX + w / 2} ${y - h * 1.2} ${rightEX + w + 2} ${y - h * 0.75}`}
        stroke={C.outline} strokeWidth={3} fill="none" strokeLinecap="round" />
    </>
  )
}

/* ===== HAIR STYLES ===== */
function AnimeHair({ cfg, style }: { cfg: typeof ageConfig.child; style: string }) {
  const cx = cfg.headCX
  const cy = cfg.headCY
  const rx = cfg.headRX
  const ry = cfg.headRY

  if (style === 'child') {
    return (
      <g>
        {/* Spiky messy child hair */}
        <path d={`M${cx - rx - 4} ${cy - 4}
          Q${cx - rx + 2} ${cy - ry - 8} ${cx - 8} ${cy - ry - 14}
          L${cx - 4} ${cy - ry - 6} L${cx - 1} ${cy - ry - 16}
          L${cx + 3} ${cy - ry - 6} L${cx + 7} ${cy - ry - 13}
          L${cx + 10} ${cy - ry - 5} L${cx + 14} ${cy - ry - 11}
          Q${cx + rx - 2} ${cy - ry - 4} ${cx + rx + 4} ${cy - 4}`}
          fill={C.hair} stroke={C.outline} strokeWidth="2" />
        {/* Hair shine */}
        <path d={`M${cx - 6} ${cy - ry - 6} L${cx - 2} ${cy - ry - 10} L${cx + 2} ${cy - ry - 6}`}
          fill={C.hairLight} opacity="0.3" />
        {/* Side hair tufts */}
        <path d={`M${cx - rx - 3} ${cy - 4} Q${cx - rx - 6} ${cy + 2} ${cx - rx} ${cy + 8}`}
          fill={C.hair} stroke={C.outline} strokeWidth="1.5" />
        <path d={`M${cx + rx + 3} ${cy - 4} Q${cx + rx + 6} ${cy + 2} ${cx + rx} ${cy + 8}`}
          fill={C.hair} stroke={C.outline} strokeWidth="1.5" />
      </g>
    )
  }

  if (style === 'military') {
    return (
      <g>
        {/* Short buzz cut - very clean */}
        <path d={`M${cx - rx - 2} ${cy - 6}
          Q${cx - rx} ${cy - ry - 5} ${cx} ${cy - ry - 6}
          Q${cx + rx} ${cy - ry - 5} ${cx + rx + 2} ${cy - 6}`}
          fill={C.hair} stroke={C.outline} strokeWidth="2" />
        {/* Subtle texture lines */}
        <path d={`M${cx - 10} ${cy - ry - 2} L${cx - 8} ${cy - ry + 4}`}
          stroke={C.hairLight} strokeWidth="0.5" opacity="0.3" />
        <path d={`M${cx + 5} ${cy - ry - 3} L${cx + 3} ${cy - ry + 3}`}
          stroke={C.hairLight} strokeWidth="0.5" opacity="0.3" />
      </g>
    )
  }

  if (style === 'young-adult') {
    return (
      <g>
        {/* Styled young adult hair - voluminous, side-part */}
        <path d={`M${cx - rx - 5} ${cy - 2}
          Q${cx - rx - 2} ${cy - ry - 6} ${cx - 10} ${cy - ry - 12}
          Q${cx - 4} ${cy - ry - 18} ${cx + 2} ${cy - ry - 14}
          Q${cx + 10} ${cy - ry - 10} ${cx + rx - 2} ${cy - ry - 8}
          Q${cx + rx + 3} ${cy - ry - 2} ${cx + rx + 5} ${cy - 2}`}
          fill={C.hair} stroke={C.outline} strokeWidth="2" />
        {/* Swept fringe */}
        <path d={`M${cx - rx - 3} ${cy - 4}
          Q${cx - rx + 5} ${cy - ry + 4} ${cx - 6} ${cy - ry + 2}
          Q${cx - 2} ${cy - ry + 6} ${cx + 6} ${cy - ry + 8}`}
          fill={C.hair} stroke="none" />
        {/* Hair shine streak */}
        <path d={`M${cx - 8} ${cy - ry - 8} Q${cx - 4} ${cy - ry - 10} ${cx} ${cy - ry - 12}`}
          stroke={C.hairLight} strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" />
        {/* Side part detail */}
        <path d={`M${cx - 10} ${cy - ry - 4} Q${cx - 12} ${cy - ry + 6} ${cx - rx - 2} ${cy + 4}`}
          stroke={C.hairLight} strokeWidth="0.5" fill="none" opacity="0.3" />
      </g>
    )
  }

  if (style === 'mature') {
    return (
      <g>
        {/* Mature professional hair - neat, shorter */}
        <path d={`M${cx - rx - 3} ${cy - 2}
          Q${cx - rx} ${cy - ry - 5} ${cx - 8} ${cy - ry - 10}
          Q${cx} ${cy - ry - 14} ${cx + 8} ${cy - ry - 10}
          Q${cx + rx} ${cy - ry - 5} ${cx + rx + 3} ${cy - 2}`}
          fill={C.hair} stroke={C.outline} strokeWidth="2" />
        {/* Side part */}
        <path d={`M${cx - 6} ${cy - ry - 6} Q${cx - 8} ${cy - ry + 2} ${cx - rx} ${cy + 2}`}
          stroke={C.hairLight} strokeWidth="0.6" fill="none" opacity="0.3" />
        {/* Hair shine */}
        <path d={`M${cx - 4} ${cy - ry - 8} Q${cx + 2} ${cy - ry - 10} ${cx + 6} ${cy - ry - 8}`}
          stroke={C.hairLight} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
      </g>
    )
  }

  return null
}

/* ===== CLOTHING - Bold, colorful, cartoon-style ===== */
function AnimeClothing({ cfg, clothing }: { cfg: typeof ageConfig.child; clothing: string }) {
  const cx = cfg.headCX
  const neckBottom = cfg.headCY + cfg.headRY + cfg.neckLen
  const sW = cfg.shoulderW / 2
  const torsoBottom = neckBottom + cfg.torsoLen

  if (clothing === 'casual-kid') {
    return (
      <g>
        {/* Yellow polo shirt - vibrant like the reference image */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 3} ${neckBottom + 5}
          L${cx - sW + 2} ${torsoBottom}
          L${cx + sW - 2} ${torsoBottom}
          L${cx + sW + 3} ${neckBottom + 5}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.shirtYellow} stroke={C.outline} strokeWidth="2" />
        {/* Collar */}
        <path d={`M${cx - 7} ${neckBottom + 1} L${cx - 10} ${neckBottom - 3} L${cx - 4} ${neckBottom + 5} L${cx} ${neckBottom + 2}
          L${cx + 4} ${neckBottom + 5} L${cx + 10} ${neckBottom - 3} L${cx + 7} ${neckBottom + 1}`}
          fill={C.shirtWhite} stroke={C.outline} strokeWidth="1.5" />
        {/* Shirt buttons */}
        <circle cx={cx} cy={neckBottom + 10} r="1.2" fill={C.outline} opacity="0.4" />
        <circle cx={cx} cy={neckBottom + 18} r="1.2" fill={C.outline} opacity="0.4" />
        {/* Blue shorts */}
        <path d={`M${cx - sW + 2} ${torsoBottom}
          L${cx - 3} ${torsoBottom + cfg.legLen * 0.5}
          L${cx + 3} ${torsoBottom + cfg.legLen * 0.5}
          L${cx + sW - 2} ${torsoBottom} Z`}
          fill="#3B5998" stroke={C.outline} strokeWidth="2" />
        {/* Shorts center line */}
        <line x1={cx} y1={torsoBottom} x2={cx} y2={torsoBottom + cfg.legLen * 0.5}
          stroke={C.outline} strokeWidth="1" opacity="0.3" />
      </g>
    )
  }

  if (clothing === 'cadet') {
    return (
      <g>
        {/* Khaki military uniform top */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 4} ${neckBottom + 6}
          L${cx - sW + 2} ${torsoBottom}
          L${cx + sW - 2} ${torsoBottom}
          L${cx + sW + 4} ${neckBottom + 6}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.uniformKhaki} stroke={C.outline} strokeWidth="2" />
        {/* Collar - high military */}
        <path d={`M${cx - 8} ${neckBottom} L${cx - 4} ${neckBottom + 6} L${cx} ${neckBottom + 2} L${cx + 4} ${neckBottom + 6} L${cx + 8} ${neckBottom}`}
          fill={C.uniformKhakiDark} stroke={C.outline} strokeWidth="1.5" />
        {/* Belt */}
        <rect x={cx - sW + 3} y={torsoBottom - 5} width={(sW - 3) * 2} height="5" rx="1"
          fill={C.pantsDark} stroke={C.outline} strokeWidth="1.5" />
        {/* Belt buckle - gold */}
        <rect x={cx - 3} y={torsoBottom - 5} width="6" height="5" rx="1"
          fill="none" stroke={C.gold} strokeWidth="1.5" />
        {/* Dark pants */}
        <path d={`M${cx - sW + 2} ${torsoBottom}
          L${cx - sW - 1} ${torsoBottom + cfg.legLen}
          L${cx + sW + 1} ${torsoBottom + cfg.legLen}
          L${cx + sW - 2} ${torsoBottom} Z`}
          fill={C.pantsDark} stroke={C.outline} strokeWidth="2" />
        {/* Pants crease */}
        <line x1={cx - sW / 2} y1={torsoBottom + 2} x2={cx - sW / 2 - 1} y2={torsoBottom + cfg.legLen - 2}
          stroke={C.outline} strokeWidth="0.5" opacity="0.2" />
        <line x1={cx + sW / 2} y1={torsoBottom + 2} x2={cx + sW / 2 + 1} y2={torsoBottom + cfg.legLen - 2}
          stroke={C.outline} strokeWidth="0.5" opacity="0.2" />
      </g>
    )
  }

  if (clothing === 'graduation') {
    return (
      <g>
        {/* Black graduation gown */}
        <path d={`M${cx - sW - 6} ${neckBottom}
          L${cx - sW - 10} ${torsoBottom + 6}
          L${cx + sW + 10} ${torsoBottom + 6}
          L${cx + sW + 6} ${neckBottom} Z`}
          fill={C.gownBlack} stroke={C.outline} strokeWidth="2" />
        {/* Gown V-neck revealing white shirt */}
        <path d={`M${cx - 7} ${neckBottom} L${cx} ${neckBottom + 20} L${cx + 7} ${neckBottom}`}
          fill={C.shirtWhite} stroke={C.outline} strokeWidth="1.5" />
        {/* Gown collar line */}
        <path d={`M${cx - 10} ${neckBottom - 1} Q${cx} ${neckBottom + 3} ${cx + 10} ${neckBottom - 1}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" />
        {/* Gown sleeve lines */}
        <path d={`M${cx - sW - 3} ${neckBottom + 8} L${cx - sW + 5} ${neckBottom + 10}`}
          stroke={C.outline} strokeWidth="0.8" opacity="0.3" />
        <path d={`M${cx + sW + 3} ${neckBottom + 8} L${cx + sW - 5} ${neckBottom + 10}`}
          stroke={C.outline} strokeWidth="0.8" opacity="0.3" />
        {/* Gold tassel cord */}
        <path d={`M${cx + 5} ${neckBottom + 2} Q${cx + 10} ${neckBottom + 10} ${cx + 8} ${neckBottom + 18}`}
          stroke={C.gold} strokeWidth="1.5" fill="none" />
        <circle cx={cx + 8} cy={neckBottom + 18} r="2" fill={C.gold} stroke={C.outline} strokeWidth="0.5" />
      </g>
    )
  }

  if (clothing === 'dress-shirt') {
    return (
      <g>
        {/* White dress shirt */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 3} ${neckBottom + 5}
          L${cx - sW + 2} ${torsoBottom}
          L${cx + sW - 2} ${torsoBottom}
          L${cx + sW + 3} ${neckBottom + 5}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.shirtWhite} stroke={C.outline} strokeWidth="2" />
        {/* Collar wings */}
        <path d={`M${cx - 7} ${neckBottom} L${cx - 10} ${neckBottom - 3} L${cx - 4} ${neckBottom + 5} L${cx} ${neckBottom + 2}
          L${cx + 4} ${neckBottom + 5} L${cx + 10} ${neckBottom - 3} L${cx + 7} ${neckBottom}`}
          fill={C.shirtWhite} stroke={C.outline} strokeWidth="1.5" />
        {/* Red tie */}
        <path d={`M${cx - 3} ${neckBottom + 2} L${cx} ${neckBottom + 8} L${cx + 3} ${neckBottom + 2} Z`}
          fill={C.tie} stroke={C.outline} strokeWidth="1" />
        <path d={`M${cx - 2} ${neckBottom + 7} L${cx} ${torsoBottom - 5} L${cx + 2} ${neckBottom + 7} Z`}
          fill={C.tie} stroke="none" />
        {/* Navy pants */}
        <path d={`M${cx - sW + 2} ${torsoBottom}
          L${cx - sW - 1} ${torsoBottom + cfg.legLen}
          L${cx + sW + 1} ${torsoBottom + cfg.legLen}
          L${cx + sW - 2} ${torsoBottom} Z`}
          fill={C.pantsNavy} stroke={C.outline} strokeWidth="2" />
      </g>
    )
  }

  if (clothing === 'business-casual') {
    return (
      <g>
        {/* Blue shirt - open collar */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 3} ${neckBottom + 5}
          L${cx - sW + 2} ${torsoBottom}
          L${cx + sW - 2} ${torsoBottom}
          L${cx + sW + 3} ${neckBottom + 5}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.shirtBlue} stroke={C.outline} strokeWidth="2" />
        {/* Open collar flaps */}
        <path d={`M${cx - 6} ${neckBottom} L${cx - 9} ${neckBottom + 8}`}
          stroke={C.shirtBlueLight} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={`M${cx + 6} ${neckBottom} L${cx + 9} ${neckBottom + 8}`}
          stroke={C.shirtBlueLight} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Collar outline */}
        <path d={`M${cx - 6} ${neckBottom} L${cx - 9} ${neckBottom + 8}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={`M${cx + 6} ${neckBottom} L${cx + 9} ${neckBottom + 8}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Dark pants */}
        <path d={`M${cx - sW + 2} ${torsoBottom}
          L${cx - sW - 1} ${torsoBottom + cfg.legLen}
          L${cx + sW + 1} ${torsoBottom + cfg.legLen}
          L${cx + sW - 2} ${torsoBottom} Z`}
          fill={C.pantsDark} stroke={C.outline} strokeWidth="2" />
      </g>
    )
  }

  if (clothing === 'suit') {
    return (
      <g>
        {/* Navy suit jacket */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 5} ${neckBottom + 7}
          L${cx - sW - 1} ${torsoBottom + 3}
          L${cx + sW + 1} ${torsoBottom + 3}
          L${cx + sW + 5} ${neckBottom + 7}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.blazerNavy} stroke={C.outline} strokeWidth="2" />
        {/* White shirt visible */}
        <path d={`M${cx - 7} ${neckBottom} L${cx - 10} ${neckBottom - 3} L${cx - 4} ${neckBottom + 5} L${cx} ${neckBottom + 2}
          L${cx + 4} ${neckBottom + 5} L${cx + 10} ${neckBottom - 3} L${cx + 7} ${neckBottom}`}
          fill={C.shirtWhite} stroke={C.outline} strokeWidth="1.5" />
        {/* Lapels - bold lines */}
        <path d={`M${cx - 7} ${neckBottom + 1} L${cx - sW + 6} ${neckBottom + 22}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" />
        <path d={`M${cx + 7} ${neckBottom + 1} L${cx + sW - 6} ${neckBottom + 22}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" />
        {/* Gold tie */}
        <path d={`M${cx - 3} ${neckBottom + 2} L${cx} ${neckBottom + 9} L${cx + 3} ${neckBottom + 2} Z`}
          fill={C.tieGold} stroke={C.outline} strokeWidth="1" />
        <path d={`M${cx - 2} ${neckBottom + 8} L${cx} ${torsoBottom - 8} L${cx + 2} ${neckBottom + 8} Z`}
          fill={C.tieGold} stroke="none" />
        {/* Suit button */}
        <circle cx={cx} cy={torsoBottom - 5} r="1.5" fill={C.outline} opacity="0.4" stroke={C.outline} strokeWidth="0.5" />
        {/* Navy pants */}
        <path d={`M${cx - sW - 1} ${torsoBottom + 3}
          L${cx - sW - 3} ${torsoBottom + cfg.legLen}
          L${cx + sW + 3} ${torsoBottom + cfg.legLen}
          L${cx + sW + 1} ${torsoBottom + 3} Z`}
          fill={C.pantsNavy} stroke={C.outline} strokeWidth="2" />
      </g>
    )
  }

  if (clothing === 'smart-casual') {
    return (
      <g>
        {/* Dark blazer - open */}
        <path d={`M${cx - sW} ${neckBottom}
          L${cx - sW - 5} ${neckBottom + 7}
          L${cx - sW - 1} ${torsoBottom + 3}
          L${cx + sW + 1} ${torsoBottom + 3}
          L${cx + sW + 5} ${neckBottom + 7}
          L${cx + sW} ${neckBottom} Z`}
          fill={C.blazerDark} stroke={C.outline} strokeWidth="2" />
        {/* Blue shirt underneath */}
        <path d={`M${cx - sW + 7} ${neckBottom}
          L${cx - sW + 5} ${torsoBottom - 3}
          L${cx + sW - 5} ${torsoBottom - 3}
          L${cx + sW - 7} ${neckBottom} Z`}
          fill={C.shirtBlue} stroke="none" />
        {/* Open collar */}
        <path d={`M${cx - 5} ${neckBottom} L${cx - 3} ${neckBottom + 8}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={`M${cx + 5} ${neckBottom} L${cx + 3} ${neckBottom + 8}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Blazer lapels */}
        <path d={`M${cx - sW + 7} ${neckBottom + 2} L${cx - sW + 3} ${neckBottom + 24}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d={`M${cx + sW - 7} ${neckBottom + 2} L${cx + sW - 3} ${neckBottom + 24}`}
          stroke={C.outline} strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Dark pants */}
        <path d={`M${cx - sW - 1} ${torsoBottom + 3}
          L${cx - sW - 3} ${torsoBottom + cfg.legLen}
          L${cx + sW + 3} ${torsoBottom + cfg.legLen}
          L${cx + sW + 1} ${torsoBottom + 3} Z`}
          fill={C.pantsDark} stroke={C.outline} strokeWidth="2" />
      </g>
    )
  }

  return null
}

/* ===== MAIN CHARACTER COMPONENT ===== */
export default function AnimatedCharacter({ age, className = '', pose = 'standing' }: CharacterProps) {
  const cfg = ageConfig[age]
  const svgW = 120
  const svgH = cfg.totalH + 10
  const cx = cfg.headCX
  const headBottom = cfg.headCY + cfg.headRY
  const neckBottom = headBottom + cfg.neckLen
  const torsoBottom = neckBottom + cfg.torsoLen
  const feetY = torsoBottom + cfg.legLen
  const isSmiling = pose === 'celebrating'
  const sw = 2.5 // standard bold outline width

  return (
    <svg className={className} viewBox={`0 0 ${svgW} ${svgH}`} fill="none">
      <defs>
        <linearGradient id={`skinGrad-${age}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={C.skinLight} />
          <stop offset="100%" stopColor={C.skin} />
        </linearGradient>
      </defs>

      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ===== HAIR (behind head) ===== */}
        <AnimeHair cfg={cfg} style={cfg.hairStyle} />

        {/* ===== HEAD - anime style with pointed chin ===== */}
        <g>
          {/* Face shape - anime style: wider forehead, narrow chin */}
          <path d={`M${cx - cfg.headRX} ${cfg.headCY - cfg.headRY * 0.15}
            Q${cx - cfg.headRX - 2} ${cfg.headCY - cfg.headRY * 0.5} ${cx - cfg.headRX * 0.55} ${cfg.headCY - cfg.headRY}
            Q${cx} ${cfg.headCY - cfg.headRY - 3} ${cx + cfg.headRX * 0.55} ${cfg.headCY - cfg.headRY}
            Q${cx + cfg.headRX + 2} ${cfg.headCY - cfg.headRY * 0.5} ${cx + cfg.headRX} ${cfg.headCY - cfg.headRY * 0.15}
            Q${cx + cfg.headRX + 2} ${cfg.headCY + cfg.headRY * 0.25} ${cx + cfg.headRX * 0.65} ${cfg.headCY + cfg.headRY * 0.65}
            Q${cx + cfg.headRX * 0.35} ${cfg.headCY + cfg.headRY + 3} ${cx} ${cfg.headCY + cfg.headRY + 5}
            Q${cx - cfg.headRX * 0.35} ${cfg.headCY + cfg.headRY + 3} ${cx - cfg.headRX * 0.65} ${cfg.headCY + cfg.headRY * 0.65}
            Q${cx - cfg.headRX - 2} ${cfg.headCY + cfg.headRY * 0.25} ${cx - cfg.headRX} ${cfg.headCY - cfg.headRY * 0.15} Z`}
            fill={`url(#skinGrad-${age})`} stroke={C.outline} strokeWidth={sw} />

          {/* Ears - small, cartoon */}
          <ellipse cx={cx - cfg.headRX - 1} cy={cfg.headCY + 2} rx="3.5" ry="5"
            fill={C.skin} stroke={C.outline} strokeWidth={1.5} />
          <ellipse cx={cx + cfg.headRX + 1} cy={cfg.headCY + 2} rx="3.5" ry="5"
            fill={C.skin} stroke={C.outline} strokeWidth={1.5} />

          {/* Blush marks - cute anime style */}
          <ellipse cx={cx - cfg.headRX * 0.55} cy={cfg.headCY + cfg.headRY * 0.25} rx={cfg.blushSize} ry={cfg.blushSize * 0.6}
            fill={C.blushPink} opacity="0.25" />
          <ellipse cx={cx + cfg.headRX * 0.55} cy={cfg.headCY + cfg.headRY * 0.25} rx={cfg.blushSize} ry={cfg.blushSize * 0.6}
            fill={C.blushPink} opacity="0.25" />

          {/* Eyes */}
          <AnimeEyes cx={cx} y={cfg.eyeY} w={cfg.eyeW} h={cfg.eyeH} isSmiling={isSmiling} />

          {/* Nose - small anime L-shape */}
          <path d={`M${cx - 1} ${cfg.noseY - 3} L${cx + 2} ${cfg.noseY}`}
            stroke={C.skinShadow} strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Mouth */}
          {isSmiling ? (
            <path d={`M${cx - 5} ${cfg.mouthY} Q${cx} ${cfg.mouthY + 6} ${cx + 5} ${cfg.mouthY}`}
              stroke={C.lipColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ) : (
            <path d={`M${cx - 3} ${cfg.mouthY} Q${cx} ${cfg.mouthY + 3} ${cx + 3} ${cfg.mouthY}`}
              stroke={C.lipColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          )}
        </g>

        {/* ===== NECK ===== */}
        <rect x={cx - 5} y={headBottom} width="10" height={cfg.neckLen}
          fill={C.skin} stroke={C.outline} strokeWidth={1.5} />
        {/* Neck shadow */}
        <path d={`M${cx - 5} ${headBottom + cfg.neckLen} L${cx + 5} ${headBottom + cfg.neckLen}`}
          stroke={C.skinShadow} strokeWidth="1.5" opacity="0.3" />

        {/* ===== BODY ===== */}
        <motion.g
          animate={
            pose === 'walking' ? { rotate: [0, 0.5, -0.5, 0] } :
            pose === 'celebrating' ? { rotate: [0, -0.5, 0.5, 0] } : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${cx}px ${neckBottom}px` }}
        >
          {/* Clothing */}
          <AnimeClothing cfg={cfg} clothing={cfg.clothing} />

          {/* ===== ARMS - Thick cartoon style ===== */}
          <g>
            {pose === 'standing' && (
              <>
                {/* Left arm - down by side */}
                <path d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                  Q${cx - cfg.shoulderW / 2 - 8} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 4} ${neckBottom + cfg.armLen * 0.85}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round" />
                {/* Left hand */}
                <circle cx={cx - cfg.shoulderW / 2 - 4} cy={neckBottom + cfg.armLen * 0.85} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
                {/* Right arm */}
                <path d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                  Q${cx + cfg.shoulderW / 2 + 8} ${neckBottom + cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 4} ${neckBottom + cfg.armLen * 0.85}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round" />
                <circle cx={cx + cfg.shoulderW / 2 + 4} cy={neckBottom + cfg.armLen * 0.85} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
              </>
            )}

            {pose === 'presenting' && (
              <>
                {/* Left arm - down */}
                <path d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                  Q${cx - cfg.shoulderW / 2 - 8} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 4} ${neckBottom + cfg.armLen * 0.85}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round" />
                <circle cx={cx - cfg.shoulderW / 2 - 4} cy={neckBottom + cfg.armLen * 0.85} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
                {/* Right arm - extended pointing */}
                <motion.path
                  d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx + cfg.shoulderW / 2 + 16} ${neckBottom + cfg.torsoLen * 0.15} ${cx + cfg.shoulderW / 2 + 24} ${neckBottom + 8}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 16} ${neckBottom + cfg.torsoLen * 0.15} ${cx + cfg.shoulderW / 2 + 24} ${neckBottom + 8}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 18} ${neckBottom + cfg.torsoLen * 0.1} ${cx + cfg.shoulderW / 2 + 26} ${neckBottom + 5}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 16} ${neckBottom + cfg.torsoLen * 0.15} ${cx + cfg.shoulderW / 2 + 24} ${neckBottom + 8}`,
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx={cx + cfg.shoulderW / 2 + 24} cy={neckBottom + 8} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5"
                  animate={{
                    cx: [cx + cfg.shoulderW / 2 + 24, cx + cfg.shoulderW / 2 + 26, cx + cfg.shoulderW / 2 + 24],
                    cy: [neckBottom + 8, neckBottom + 5, neckBottom + 8],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}

            {pose === 'celebrating' && (
              <>
                {/* Both arms raised - celebrating! */}
                <motion.path
                  d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx - cfg.shoulderW / 2 - 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx - cfg.shoulderW / 2 - 12} ${cfg.headCY - 6}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx - cfg.shoulderW / 2 - 12} ${cfg.headCY - 6}`,
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 20} ${neckBottom - cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 14} ${cfg.headCY - 10}`,
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx - cfg.shoulderW / 2 - 12} ${cfg.headCY - 6}`,
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx={cx - cfg.shoulderW / 2 - 12} cy={cfg.headCY - 6} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5"
                  animate={{
                    cy: [cfg.headCY - 6, cfg.headCY - 10, cfg.headCY - 6],
                    cx: [cx - cfg.shoulderW / 2 - 12, cx - cfg.shoulderW / 2 - 14, cx - cfg.shoulderW / 2 - 12],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx + cfg.shoulderW / 2 + 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${cfg.headCY - 6}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${cfg.headCY - 6}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 20} ${neckBottom - cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 14} ${cfg.headCY - 10}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 18} ${neckBottom - cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${cfg.headCY - 6}`,
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                />
                <motion.circle
                  cx={cx + cfg.shoulderW / 2 + 12} cy={cfg.headCY - 6} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5"
                  animate={{
                    cy: [cfg.headCY - 6, cfg.headCY - 10, cfg.headCY - 6],
                    cx: [cx + cfg.shoulderW / 2 + 12, cx + cfg.shoulderW / 2 + 14, cx + cfg.shoulderW / 2 + 12],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                />
              </>
            )}

            {pose === 'walking' && (
              <>
                <motion.path
                  d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx - cfg.shoulderW / 2 - 10} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 6} ${neckBottom + cfg.armLen * 0.8}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 10} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 6} ${neckBottom + cfg.armLen * 0.8}`,
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 5} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 2} ${neckBottom + cfg.armLen * 0.8}`,
                      `M${cx - cfg.shoulderW / 2} ${neckBottom + 4} Q${cx - cfg.shoulderW / 2 - 10} ${neckBottom + cfg.torsoLen * 0.4} ${cx - cfg.shoulderW / 2 - 6} ${neckBottom + cfg.armLen * 0.8}`,
                    ]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx + cfg.shoulderW / 2 + 5} ${neckBottom + cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 2} ${neckBottom + cfg.armLen * 0.8}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 5} ${neckBottom + cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 2} ${neckBottom + cfg.armLen * 0.8}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 10} ${neckBottom + cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 6} ${neckBottom + cfg.armLen * 0.8}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 5} ${neckBottom + cfg.torsoLen * 0.4} ${cx + cfg.shoulderW / 2 + 2} ${neckBottom + cfg.armLen * 0.8}`,
                    ]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}

            {pose === 'sitting' && (
              <>
                {/* Left arm resting */}
                <path d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                  Q${cx - cfg.shoulderW / 2 - 8} ${neckBottom + cfg.torsoLen * 0.3} ${cx - cfg.shoulderW / 2 - 5} ${neckBottom + cfg.armLen * 0.6}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round" />
                <circle cx={cx - cfg.shoulderW / 2 - 5} cy={neckBottom + cfg.armLen * 0.6} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
                {/* Right arm on desk */}
                <motion.path
                  d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx + cfg.shoulderW / 2 + 8} ${neckBottom + cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${neckBottom + cfg.armLen * 0.65}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 8} ${neckBottom + cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${neckBottom + cfg.armLen * 0.65}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 9} ${neckBottom + cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 13} ${neckBottom + cfg.armLen * 0.7}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 8} ${neckBottom + cfg.torsoLen * 0.3} ${cx + cfg.shoulderW / 2 + 12} ${neckBottom + cfg.armLen * 0.65}`,
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <circle cx={cx + cfg.shoulderW / 2 + 12} cy={neckBottom + cfg.armLen * 0.65} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
              </>
            )}

            {pose === 'writing' && (
              <>
                {/* Left arm resting */}
                <path d={`M${cx - cfg.shoulderW / 2} ${neckBottom + 4}
                  Q${cx - cfg.shoulderW / 2 - 6} ${neckBottom + cfg.torsoLen * 0.3} ${cx - cfg.shoulderW / 2 - 3} ${neckBottom + cfg.armLen * 0.6}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round" />
                <circle cx={cx - cfg.shoulderW / 2 - 3} cy={neckBottom + cfg.armLen * 0.6} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5" />
                {/* Right arm writing */}
                <motion.path
                  d={`M${cx + cfg.shoulderW / 2} ${neckBottom + 4}
                    Q${cx + cfg.shoulderW / 2 + 6} ${neckBottom + cfg.torsoLen * 0.2} ${cx + cfg.shoulderW / 2 + 10} ${neckBottom + cfg.armLen * 0.65}`}
                  stroke={C.outline} strokeWidth={sw} fill="none" strokeLinecap="round"
                  animate={{
                    d: [
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 6} ${neckBottom + cfg.torsoLen * 0.2} ${cx + cfg.shoulderW / 2 + 10} ${neckBottom + cfg.armLen * 0.65}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 7} ${neckBottom + cfg.torsoLen * 0.2} ${cx + cfg.shoulderW / 2 + 11} ${neckBottom + cfg.armLen * 0.7}`,
                      `M${cx + cfg.shoulderW / 2} ${neckBottom + 4} Q${cx + cfg.shoulderW / 2 + 6} ${neckBottom + cfg.torsoLen * 0.2} ${cx + cfg.shoulderW / 2 + 10} ${neckBottom + cfg.armLen * 0.65}`,
                    ]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx={cx + cfg.shoulderW / 2 + 10} cy={neckBottom + cfg.armLen * 0.65} r="4"
                  fill={C.skin} stroke={C.outline} strokeWidth="1.5"
                  animate={{
                    cx: [cx + cfg.shoulderW / 2 + 10, cx + cfg.shoulderW / 2 + 11, cx + cfg.shoulderW / 2 + 10],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}
          </g>

          {/* ===== LEGS - Thick cartoon style ===== */}
          {(pose === 'standing' || pose === 'celebrating' || pose === 'presenting') && (
            <g>
              {/* Left leg - thick rounded */}
              <path d={`M${cx - cfg.hipW * 0.22} ${torsoBottom}
                L${cx - cfg.hipW * 0.28} ${feetY}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round" />
              {/* Right leg */}
              <path d={`M${cx + cfg.hipW * 0.22} ${torsoBottom}
                L${cx + cfg.hipW * 0.28} ${feetY}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round" />
              {/* Shoes - rounded cartoon style */}
              <ellipse cx={cx - cfg.hipW * 0.28} cy={feetY + 2} rx="6" ry="3" fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5" />
              <ellipse cx={cx + cfg.hipW * 0.28} cy={feetY + 2} rx="6" ry="3" fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5" />
            </g>
          )}

          {pose === 'walking' && (
            <g>
              <motion.path
                d={`M${cx - cfg.hipW * 0.22} ${torsoBottom} L${cx - cfg.hipW * 0.38} ${feetY}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round"
                animate={{
                  d: [
                    `M${cx - cfg.hipW * 0.22} ${torsoBottom} L${cx - cfg.hipW * 0.38} ${feetY}`,
                    `M${cx - cfg.hipW * 0.22} ${torsoBottom} L${cx - cfg.hipW * 0.12} ${feetY}`,
                    `M${cx - cfg.hipW * 0.22} ${torsoBottom} L${cx - cfg.hipW * 0.38} ${feetY}`,
                  ]
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d={`M${cx + cfg.hipW * 0.22} ${torsoBottom} L${cx + cfg.hipW * 0.12} ${feetY}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round"
                animate={{
                  d: [
                    `M${cx + cfg.hipW * 0.22} ${torsoBottom} L${cx + cfg.hipW * 0.12} ${feetY}`,
                    `M${cx + cfg.hipW * 0.22} ${torsoBottom} L${cx + cfg.hipW * 0.38} ${feetY}`,
                    `M${cx + cfg.hipW * 0.22} ${torsoBottom} L${cx + cfg.hipW * 0.12} ${feetY}`,
                  ]
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx={cx - cfg.hipW * 0.38} cy={feetY + 2} rx="6" ry="3"
                fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5"
                animate={{ cx: [cx - cfg.hipW * 0.38, cx - cfg.hipW * 0.12, cx - cfg.hipW * 0.38] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx={cx + cfg.hipW * 0.12} cy={feetY + 2} rx="6" ry="3"
                fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5"
                animate={{ cx: [cx + cfg.hipW * 0.12, cx + cfg.hipW * 0.38, cx + cfg.hipW * 0.12] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          )}

          {(pose === 'sitting' || pose === 'writing') && (
            <g>
              {/* Seated legs - bent at knees */}
              <path d={`M${cx - cfg.hipW * 0.22} ${torsoBottom}
                Q${cx - cfg.hipW * 0.5} ${torsoBottom + cfg.legLen * 0.35} ${cx - cfg.hipW * 0.6} ${torsoBottom + cfg.legLen * 0.3}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round" />
              <path d={`M${cx + cfg.hipW * 0.22} ${torsoBottom}
                Q${cx + cfg.hipW * 0.5} ${torsoBottom + cfg.legLen * 0.35} ${cx + cfg.hipW * 0.6} ${torsoBottom + cfg.legLen * 0.3}`}
                stroke={C.outline} strokeWidth={sw + 2} fill="none" strokeLinecap="round" />
              {/* Shoes */}
              <ellipse cx={cx - cfg.hipW * 0.6} cy={torsoBottom + cfg.legLen * 0.33} rx="6" ry="3" fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5" />
              <ellipse cx={cx + cfg.hipW * 0.6} cy={torsoBottom + cfg.legLen * 0.33} rx="6" ry="3" fill={C.shoesBlack} stroke={C.outline} strokeWidth="1.5" />
            </g>
          )}
        </motion.g>
      </motion.g>
    </svg>
  )
}
