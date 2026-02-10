import { motion } from 'framer-motion'

export default function SlideDiscovery() {
    return (
        <div className="slide__inner slide__inner--right">
            <motion.div
                initial={{ opacity: 0, y: 18, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                <svg className="discovery__card" viewBox="0 0 200 260" fill="none">
                    <rect x="10" y="20" width="180" height="230" rx="4" fill="#F5EDE3" stroke="#D4C4B0" strokeWidth="1" />
                    <rect x="10" y="20" width="180" height="115" rx="4" fill="#EDE4D8" stroke="#D4C4B0" strokeWidth="1" />
                    <path d="M10 135 L100 80 L190 135" fill="#F0E6D9" stroke="#D4C4B0" strokeWidth="1" />
                    <circle cx="100" cy="105" r="12" fill="none" stroke="#C4967A" strokeWidth="1" opacity="0.6" />
                    <path d="M95 105 L100 110 L105 100" stroke="#C4967A" strokeWidth="1" fill="none" opacity="0.6" />
                </svg>
            </motion.div>
            <motion.p
                className="discovery__text"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                I made you something.
            </motion.p>
        </div>
    )
}
