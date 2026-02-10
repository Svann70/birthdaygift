import { motion } from 'framer-motion'
import { useCallback } from 'react'

export default function SlideShift() {
    const spawnConfetti = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2
        const colors = ['rgba(196,150,122,0.75)', 'rgba(208,216,200,0.7)', 'rgba(232,224,240,0.7)', 'rgba(240,224,214,0.8)', 'rgba(212,184,160,0.65)']
        const n = 10 + Math.floor(Math.random() * 4)
        for (let i = 0; i < n; i++) {
            const d = document.createElement('div')
            d.className = 'mini-confetti'
            const a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.6
            const dist = 25 + Math.random() * 55
            d.style.cssText = `left:${cx}px;top:${cy}px;background:${colors[i % colors.length]};width:${4 + Math.random() * 5}px;height:${4 + Math.random() * 5}px;border-radius:${Math.random() > 0.4 ? '50%' : '2px'}`
            d.style.setProperty('--tx', Math.cos(a) * dist + 'px')
            d.style.setProperty('--ty', (Math.sin(a) * dist - 15) + 'px')
            document.body.appendChild(d)
            setTimeout(() => d.remove(), 1100)
        }
    }, [])

    return (
        <div className="slide__inner slide__inner--center">
            <div className="shift__floaters">
                <div className="floater floater--1" /><div className="floater floater--2" />
                <div className="floater floater--3" /><div className="floater floater--4" />
            </div>
            <div className="shift__text">
                <motion.p className="shift__also" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>Also…</motion.p>
                <motion.p className="shift__birthday" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}>it's your birthday.</motion.p>
            </div>
            <motion.div className="shift__sparkle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.4 }}>
                <button className="sparkle-btn" onClick={spawnConfetti} aria-label="Sparkle">
                    <svg viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="24" stroke="#C4967A" strokeWidth="1.5" opacity="0.5" />
                        <text x="30" y="36" textAnchor="middle" fontSize="20" fill="#C4967A" opacity="0.65">✦</text>
                    </svg>
                </button>
                <span className="sparkle-label">tap</span>
            </motion.div>
        </div>
    )
}
