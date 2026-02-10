import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import './App.css'

/* ═══════════════════════════════════════════════════════════════
   TYPES & ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

type ViewState = 'LOADING' | 'ENVELOPE' | 'LETTER' | 'DASHBOARD'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }
  })
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 }
  }
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut', delay }
  })
}

/* ═══════════════════════════════════════════════════════════════
   REUSABLE — Scroll Reveal Wrapper
   ═══════════════════════════════════════════════════════════════ */

function ScrollReveal({
  children,
  className,
  variants: v,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v || fadeInUp}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLES — Subtle Floating Dots
   ═══════════════════════════════════════════════════════════════ */

function ParticleField() {
  const particles = useRef(
    [...Array(22)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      w: `${Math.random() * 3 + 1.5}px`,
      delay: `${Math.random() * 8}s`,
      dur: `${Math.random() * 6 + 7}s`,
    }))
  )

  return (
    <div className="particle-field">
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.w,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MUSIC PLAYER — Floating Glassmorphic Pill
   ═══════════════════════════════════════════════════════════════ */

function MusicPlayer({
  playing,
  onToggle,
}: {
  playing: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      className="music-player"
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <div className="music-player__icon">
        {playing ? (
          <div className="equalizer">
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
      <span className="music-player__label">
        {playing ? 'Now Playing' : 'Play Music'}
      </span>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   1. LOADING SCREEN — Cinematic Entrance
   ═══════════════════════════════════════════════════════════════ */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Smooth progress simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        // Randomize speed slightly for realism
        return prev + Math.random() * 2.5
      })
    }, 50)

    const finishTimer = setTimeout(onComplete, 3500) // Slightly longer for mood

    return () => {
      clearInterval(timer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="screen loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <ParticleField />

      <div className="loading-screen__content">
        <motion.div
          className="loading-screen__ornament"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.h2
          className="loading-screen__text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Preparing Something Special
        </motion.h2>

        {/* Cinematic Progress Line */}
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. ENVELOPE SCREEN — The Birthday Card
   ═══════════════════════════════════════════════════════════════ */

function EnvelopeScreen({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 1100)
  }

  return (
    <motion.div
      className="screen envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9 }}
    >
      <motion.h2
        className="envelope-screen__title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        A Birthday Letter for You
      </motion.h2>

      <motion.div
        className={`envelope ${opening ? 'envelope--opening' : ''}`}
        onClick={handleClick}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={!opening ? { y: -6, scale: 1.01 } : undefined}
      >
        <div className="envelope__body">
          <span className="envelope__name">For Josh</span>
        </div>
        <div className="envelope__seal">
          <span className="envelope__seal-text">✦</span>
        </div>
      </motion.div>

      <motion.p
        className="envelope-screen__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        tap to open
      </motion.p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3. LETTER SCREEN — The Centerpiece Moment
   ═══════════════════════════════════════════════════════════════ */

function LetterScreen({ onNext }: { onNext: () => void }) {
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCta(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="screen letter-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="letter-paper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="letter-paper__date">February 2026</div>

        <h1 className="letter-paper__title">For You, On Your Birthday</h1>

        <div className="letter-paper__divider" />

        <div className="letter-paper__body">
          <p>
            I wanted to make something that lasts longer
            than a message or a gift.
          </p>
          <p>
            Something you could return to,
            whenever you feel like it.
          </p>
        </div>

        <AnimatePresence>
          {showCta && (
            <motion.button
              className="letter-paper__cta"
              onClick={onNext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Enter the Experience
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO VISUAL — Elegant SVG Composition
   ═══════════════════════════════════════════════════════════════ */

function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-visual__glow" />
      <svg className="hero-visual__svg" viewBox="0 0 400 400" fill="none">
        {/* Concentric rings — geometric elegance */}
        <circle cx="200" cy="200" r="190" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="160" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="130" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="200" cy="200" r="40" stroke="rgba(196,150,122,0.15)" strokeWidth="1" />

        {/* Center accent */}
        <circle cx="200" cy="200" r="6" fill="rgba(196,150,122,0.55)" />
        <circle cx="200" cy="200" r="15" stroke="rgba(196,150,122,0.2)" strokeWidth="0.75" />

        {/* Cardinal points */}
        <circle cx="200" cy="70" r="2" fill="rgba(255,255,255,0.12)" />
        <circle cx="200" cy="330" r="2" fill="rgba(255,255,255,0.12)" />
        <circle cx="70" cy="200" r="2" fill="rgba(255,255,255,0.12)" />
        <circle cx="330" cy="200" r="2" fill="rgba(255,255,255,0.12)" />

        {/* Diagonal accent lines */}
        <line x1="145" y1="145" x2="125" y2="125" stroke="rgba(196,150,122,0.12)" strokeWidth="0.75" />
        <line x1="255" y1="255" x2="275" y2="275" stroke="rgba(196,150,122,0.12)" strokeWidth="0.75" />
        <line x1="255" y1="145" x2="275" y2="125" stroke="rgba(196,150,122,0.12)" strokeWidth="0.75" />
        <line x1="145" y1="255" x2="125" y2="275" stroke="rgba(196,150,122,0.12)" strokeWidth="0.75" />

        {/* Orbiting dots */}
        <circle cx="200" cy="40" r="1.5" fill="rgba(196,150,122,0.3)" />
        <circle cx="360" cy="200" r="1.5" fill="rgba(196,150,122,0.3)" />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4–8. DASHBOARD — Full Birthday Story
   ═══════════════════════════════════════════════════════════════ */

function Dashboard({ onReplay }: { onReplay: () => void }) {
  const storyCards = [
    { num: '01', title: 'This Year Felt Like', desc: 'Quiet growth, honest moments, and strength.' },
    { num: '02', title: 'What Makes You, You', desc: 'Presence, humor, and sincerity.' },
    { num: '03', title: 'What I Appreciate Most', desc: 'The way you show up, consistently.' },
    { num: '04', title: 'This Birthday Gift', desc: 'A moment made just for you.' },
  ]

  const galleryItems = [
    { gradient: 'linear-gradient(135deg, #3E2B32 0%, #5A3D45 100%)', label: 'Warmth' },
    { gradient: 'linear-gradient(135deg, #2D3A4A 0%, #1A2530 100%)', label: 'Stillness' },
    { gradient: 'linear-gradient(135deg, #4A3B30 0%, #3D2E22 100%)', label: 'Golden Hour' },
    { gradient: 'linear-gradient(135deg, #3A2D3E 0%, #2B1E30 100%)', label: 'Evening' },
    { gradient: 'linear-gradient(135deg, #2D3E3A 0%, #1A302B 100%)', label: 'Calm' },
    { gradient: 'linear-gradient(135deg, #4A3D2D 0%, #3E3020 100%)', label: 'Memory' },
  ]

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* ── 4. Hero Section ── */}
      <section className="section hero-section">
        <div className="container hero-section__inner">
          <ScrollReveal className="hero-section__content">
            <motion.p className="hero-section__eyebrow" variants={fadeIn}>
              A Celebration
            </motion.p>
            <motion.h1 className="hero-section__headline" variants={fadeInUp}>
              Your Birthday,<br />Told Gently.
            </motion.h1>
            <motion.p className="hero-section__subtext" variants={fadeInUp} custom={0.15}>
              A few moments, thoughts, and memories<br />
              made just for you.
            </motion.p>
          </ScrollReveal>

          <ScrollReveal className="hero-section__visual">
            <HeroVisual />
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. Story Cards ── */}
      <section className="section cards-section">
        <div className="container">
          <ScrollReveal>
            <p className="section-eyebrow">Reflections</p>
            <h2 className="section-title">Moments That Matter</h2>
          </ScrollReveal>

          <motion.div
            className="cards-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
          >
            {storyCards.map((card, i) => (
              <motion.div key={i} className="story-card" variants={fadeInUp}>
                <span className="story-card__num">{card.num}</span>
                <h3 className="story-card__title">{card.title}</h3>
                <p className="story-card__desc">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Personal Note ── */}
      <section className="section note-section">
        <div className="container">
          <ScrollReveal className="note-card">
            <div className="note-card__accent" />
            <h2 className="note-card__title">A Note for You</h2>
            <div className="note-card__divider" />
            <p className="note-card__body">
              Thank you for being the kind of person
              who makes things feel lighter just by being there.
              I'm really glad I get to celebrate you today.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. Memory Gallery ── */}
      <section className="section gallery-section">
        <div className="container">
          <ScrollReveal>
            <p className="section-eyebrow">Gallery</p>
            <h2 className="section-title">Moments Worth Keeping</h2>
          </ScrollReveal>

          <motion.div
            className="gallery-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                className="gallery-item"
                variants={fadeInUp}
                style={{ background: item.gradient }}
              >
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. Final Closing ── */}
      <footer className="section final-section">
        <ScrollReveal className="final-section__content">
          <motion.div className="final-section__ornament" variants={fadeIn} />
          <motion.h1 className="final-section__headline" variants={fadeInUp}>
            Happy Birthday, Josh.
          </motion.h1>
          <motion.p className="final-section__subtext" variants={fadeInUp} custom={0.15}>
            Made with care, thought, and appreciation.
          </motion.p>
          <motion.button
            className="final-section__btn"
            onClick={onReplay}
            variants={fadeInUp}
            custom={0.3}
          >
            Revisit the Letter
          </motion.button>
        </ScrollReveal>
      </footer>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP ORCHESTRATOR
   ═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [view, setView] = useState<ViewState>('LOADING')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.pixabay.com/audio/2024/11/28/audio_3fce705fa6.mp3'
      )
      audioRef.current.loop = true
      audioRef.current.volume = 0.4
    }

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(console.error)
    }
    setPlaying((prev) => !prev)
  }, [playing])

  const handleEnvelopeOpen = useCallback(() => {
    if (!playing) {
      // Auto-start music when the letter is opened
      if (!audioRef.current) {
        audioRef.current = new Audio(
          'https://cdn.pixabay.com/audio/2024/11/28/audio_3fce705fa6.mp3'
        )
        audioRef.current.loop = true
        audioRef.current.volume = 0.4
      }
      audioRef.current.play().catch(console.error)
      setPlaying(true)
    }
    setView('LETTER')
  }, [playing])

  return (
    <div className={`app ${view === 'DASHBOARD' ? 'app--dark' : ''}`}>
      {/* Floating Music Player — visible after loading */}
      {view !== 'LOADING' && (
        <MusicPlayer playing={playing} onToggle={toggleMusic} />
      )}

      <AnimatePresence mode="wait">
        {view === 'LOADING' && (
          <LoadingScreen
            key="loading"
            onComplete={() => setView('ENVELOPE')}
          />
        )}
        {view === 'ENVELOPE' && (
          <EnvelopeScreen key="envelope" onOpen={handleEnvelopeOpen} />
        )}
        {view === 'LETTER' && (
          <LetterScreen key="letter" onNext={() => setView('DASHBOARD')} />
        )}
        {view === 'DASHBOARD' && (
          <Dashboard key="dashboard" onReplay={() => setView('LETTER')} />
        )}
      </AnimatePresence>
    </div>
  )
}
