import { motion } from 'framer-motion'

export default function SlideEntry() {
    return (
        <div className="slide__inner slide__inner--left">
            <motion.p
                className="entry__hey"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Hey.
            </motion.p>
            <motion.p
                className="entry__today"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
            >
                Today's your day.
            </motion.p>
        </div>
    )
}
