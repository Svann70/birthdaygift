import { motion } from 'framer-motion'

export default function SlideEnding() {
    return (
        <div className="slide__inner slide__inner--center">
            <motion.p className="ending__text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                I'm really glad you're here.
            </motion.p>
        </div>
    )
}
