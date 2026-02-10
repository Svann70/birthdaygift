import { motion } from 'framer-motion'

export default function SlideMemories() {
    return (
        <div className="slide__inner slide__inner--center">
            <div className="memories__layout">
                <motion.p className="memories__whisper"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >Some moments stay.</motion.p>

                <div className="memories__grid">
                    <motion.div className="memory-img memory-img--1"
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        <svg viewBox="0 0 280 210">
                            <rect width="280" height="210" fill="#F7F0E8" rx="4" />
                            <circle cx="70" cy="120" r="32" fill="#E8D5C4" opacity="0.7" />
                            <circle cx="110" cy="100" r="22" fill="#D4B8A0" opacity="0.5" />
                            <path d="M40 170 Q90 130 140 160 Q190 190 240 150" stroke="#C4967A" strokeWidth="2" fill="none" opacity="0.5" />
                            <circle cx="180" cy="65" r="4" fill="#E0B0A0" opacity="0.6" />
                            <circle cx="190" cy="58" r="3" fill="#D4A090" opacity="0.5" />
                            <line x1="183" y1="69" x2="180" y2="92" stroke="#A0B890" strokeWidth="1" opacity="0.4" />
                            <circle cx="225" cy="78" r="3" fill="#E0B0A0" opacity="0.5" />
                            <line x1="227" y1="81" x2="225" y2="98" stroke="#A0B890" strokeWidth="1" opacity="0.4" />
                        </svg>
                    </motion.div>

                    <motion.div className="memory-img memory-img--2"
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                    >
                        <svg viewBox="0 0 220 260">
                            <rect width="220" height="260" fill="#F0E8E0" rx="4" />
                            <ellipse cx="80" cy="110" rx="36" ry="34" fill="#E8DDD0" stroke="#D0C0A8" strokeWidth="1" />
                            <ellipse cx="80" cy="110" rx="26" ry="24" fill="#D4C0A0" opacity="0.35" />
                            <path d="M116 102 Q130 108 128 120 Q124 132 115 125" stroke="#D0C0A8" strokeWidth="1" fill="none" />
                            <ellipse cx="150" cy="150" rx="30" ry="28" fill="#E8DDD0" stroke="#D0C0A8" strokeWidth="1" />
                            <ellipse cx="150" cy="150" rx="20" ry="18" fill="#C8B090" opacity="0.3" />
                            <path d="M75 78 Q72 65 75 57" stroke="#D0C0A8" strokeWidth="1" fill="none" opacity="0.3" />
                            <path d="M85 74 Q82 62 85 54" stroke="#D0C0A8" strokeWidth="1" fill="none" opacity="0.25" />
                        </svg>
                    </motion.div>

                    <motion.div className="memory-img memory-img--3"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <svg viewBox="0 0 300 140">
                            <rect width="300" height="140" fill="#E8E0F0" rx="4" />
                            <rect width="300" height="140" fill="#2A2540" rx="4" opacity="0.07" />
                            <circle cx="230" cy="30" r="14" fill="#F0E8D0" opacity="0.15" />
                            <circle cx="236" cy="27" r="12" fill="#E8E0F0" />
                            <circle cx="40" cy="25" r="1.5" fill="#D4C4B0" opacity="0.5" />
                            <circle cx="100" cy="18" r="1" fill="#D4C4B0" opacity="0.4" />
                            <circle cx="150" cy="35" r="1.5" fill="#D4C4B0" opacity="0.55" />
                            <circle cx="70" cy="48" r="1" fill="#D4C4B0" opacity="0.35" />
                            <circle cx="260" cy="22" r="1" fill="#D4C4B0" opacity="0.4" />
                            <path d="M0 110 Q70 85 150 100 Q230 115 300 95 L300 140 L0 140Z" fill="#3A3350" opacity="0.08" />
                        </svg>
                    </motion.div>
                </div>

                <motion.p className="memories__between"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >the ones we didn't photograph.</motion.p>
            </div>
        </div>
    )
}
