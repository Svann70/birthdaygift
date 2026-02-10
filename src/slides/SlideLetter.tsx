import { motion } from 'framer-motion'

interface Props {
    onContinue: () => void
}

export default function SlideLetter({ onContinue }: Props) {
    return (
        <div className="slide__inner slide__inner--center">
            <motion.div
                className="letter-paper"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
                <motion.p
                    className="letter__opening"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    I didn't want to just say happy birthday
                    <br />
                    and disappear into the day.
                </motion.p>
                <motion.button
                    className="letter__continue"
                    onClick={onContinue}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                >
                    keep going →
                </motion.button>
            </motion.div>
        </div>
    )
}
