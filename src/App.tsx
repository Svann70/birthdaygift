import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

/* ═══════════════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════════════ */

type ViewState = 'LOADING' | 'ENVELOPE' | 'LETTER' | 'STORY' | 'FINAL'

type SlideType = 'intro' | 'message'

interface SlideData {
  id: number
  type: SlideType
  image: string
  title?: string
  subtitle?: string
  sender?: string
  message?: string
}

const MEMORY_SLIDES: SlideData[] = [
  {
    id: 1,
    type: 'intro',
    title: 'Recall Memories',
    subtitle: 'The moments we carry with us.',
    // Group photo concept
    image: '/1.jpeg'
  },
  {
    id: 2,
    type: 'intro',
    title: 'Pria Solo Nyengir',
    subtitle: 'CITTYY BOIII',
    image: '/2.jpeg'
  },
  {
    id: 3,
    type: 'message',
    sender: 'Stepani',
    message: "Hai josh‼️ you know who it is, gualah rachel stefanny. Happy birthday yang ke 19 tahun, we’re close to kepala dua! Really glad we could reconnect after some time, its always been great being your friend ever since SD. Semoga di umur yang baru ini you will always be surrounded by good people and may your wish came true! I believe God will always be by your side, or even bestie people HAHAHHA. Stay cringe, stay gaming, stay cool, together we are fnaf. HAPPY BIRTHDAY ONCE AGAIN!!!",
    image: '/3.jpeg'
  },
  {
    id: 4,
    type: 'message',
    sender: 'Bradley',
    message: "HBD city boi, selamat ultah ke 19 unc, officially an uncle, bisa minum susu sekarang, selalu putih jangan menghitam dan siap siap hidup seperti me in japan. Semakin tua artinya lu semakin tua, semoga lu selalu tidur dengan bantal dingin KEDUA sisi, dan gak bakal botak. Kata orang menua itu menakutkan tapi kata gw menua itu mengerikan, jadi takutlah, tapi jangan terlalu takut, ada gw soalnya. Terakhir, jangan cepet mati",
    image: '/4.jpeg'
  },
  {
    id: 5,
    type: 'message',
    sender: 'Zefanya',
    message: "Jehosuwi🐓 hepi birtday yng ke 19 ya brok dari lu yg sekecil 🐣 menjadi segede 🐓 lol. semoga tahun ini bisa menjadi pribadi yg lebih baik ke orang tua, lebih deket sama Tuhan, dan lebih deket lagi sama kita KWWKKW wish u all the best yaw🐴",
    image: '/5.jpeg'
  },
  {
    id: 6,
    type: 'message',
    sender: 'Bryant',
    message: "Habede bub 👉🏻👈🏻, anjay goks wow bgt udh 19 th. Semakin tua harusnya semakin bisa bergadang (harus dibiasakan sblm masuk dunia pekerjaan 😋). Semoga IPK nya 4, lulus suma cumlaude cita citanya tergapai, dan membanggakan orang tua & keluarga Amen! Sekarang wejangan dari gua. Kurangin individualis, apatis, NPD, narsistik, pikmi, caper, freaky, baka nya ya bub. GBUU😋🔥🫰🏻Dari manusia berkarisma tinggi🤵✨",
    image: '/6.jpeg'
  },
  {
    id: 7,
    type: 'message',
    sender: 'Ivan',
    message: "HAPPY BIRTHDAY MANN, Wish u all the best. Sehat selalu, diberkati Tuhan, banyak rezekii, IPK 4, lulus cumlaude, dan membanggakan orang tua & keluarga, kaya raya, punya pent house, tidak gamon",
    image: '/7.jpeg'
  },
  {
    id: 8,
    type: 'message',
    sender: 'WenWen',
    message: "ジェホさん、誕生日おめでとうございます🎉 19歳おめでとう！",
    image: '/8.jpeg'
  }
]

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   PARTICLES
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
   MUSIC PLAYER
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
        {playing ? 'Now Playing - Persona 3 Color Your Night' : 'Play Music'}
      </span>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   1. LOADING SCREEN
   ═══════════════════════════════════════════════════════════════ */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 2.5
      })
    }, 50)

    const finishTimer = setTimeout(onComplete, 3500)

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
   2. ENVELOPE SCREEN
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
   3. LETTER SCREEN
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
   4. STORY FLOW — Full Screen Cinematic Experience
   ═══════════════════════════════════════════════════════════════ */

function StoryFlow({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (index < MEMORY_SLIDES.length - 1) {
      setDirection(1)
      setIndex(index + 1)
    } else {
      onComplete() // Proceed to Final Screen
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1)
      setIndex(index - 1)
    }
  }

  const slide = MEMORY_SLIDES[index]
  const isIntro = slide.type === 'intro'

  return (
    <div className="screen story-screen">
      {/* Background Ambience (Subtle) */}
      <div className="story-bg" style={{ backgroundImage: `url(${slide.image})` }} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          className="story-page"
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* UNIFIED LAYOUT: Left Image, Right Text */}
          <div className="story-layout">

            {/* Left Column: Image */}
            <div className="story-image-col">
              <div className="story-image-frame">
                <img src={slide.image} alt="Memory" loading="lazy" />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="story-content-col">
              {isIntro ? (
                // Intro Content Style
                <div className="intro-text-wrapper">
                  <span className="slide-eyebrow">Chapter {index + 1}</span>
                  <h1 className="slide-title-large">{slide.title}</h1>
                  <div className="intro-divider" />
                  <p className="slide-subtitle-large">{slide.subtitle}</p>
                </div>
              ) : (
                // Message Content Style
                <div className="message-text-wrapper">
                  <div className="quote-mark">“</div>
                  <p className="message-text">{slide.message}</p>
                  <div className="message-author">
                    <span className="author-line" />
                    <span className="author-name">{slide.sender}</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="story-nav">
        <button
          className="nav-btn prev"
          onClick={handlePrev}
          disabled={index === 0}
          style={{ opacity: index === 0 ? 0.3 : 1, pointerEvents: index === 0 ? 'none' : 'auto' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div className="nav-indicators">
          {MEMORY_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`nav-dot ${i === index ? 'active' : ''}`}
            />
          ))}
        </div>

        <button className="nav-btn next" onClick={handleNext}>
          {index === MEMORY_SLIDES.length - 1 ? (
            <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0 4px' }}>FINISH</span>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          )}
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5. FINAL SCREEN — The Closing
   ═══════════════════════════════════════════════════════════════ */

function FinalScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      className="screen final-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="final-content">
        <div className="final-ornament" />
        <h1 className="final-title">Happy Birthday, Josh.</h1>
        <p className="final-subtitle">yang bikin gua, ipan. hope u like it, dan kalau butuh jasa gua monggo di contact aja HAHHAHAHA @ivanderdniel</p>
        <button className="final-btn" onClick={onReplay}>Revisit the Letter</button>
      </div>
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
      audioRef.current = new Audio('/music.mp3')
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
      if (!audioRef.current) {
        audioRef.current = new Audio('/music.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = 0.4
      }
      audioRef.current.play().catch(console.error)
      setPlaying(true)
    }
    setView('LETTER')
  }, [playing])

  return (
    <div className={`app ${view === 'STORY' ? 'app--dark' : ''}`}>
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
          <LetterScreen key="letter" onNext={() => setView('STORY')} />
        )}
        {view === 'STORY' && (
          <StoryFlow key="story" onComplete={() => setView('FINAL')} />
        )}
        {view === 'FINAL' && (
          <FinalScreen key="final" onReplay={() => setView('LETTER')} />
        )}
      </AnimatePresence>
    </div>
  )
}
