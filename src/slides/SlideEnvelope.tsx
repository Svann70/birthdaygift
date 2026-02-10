import { motion } from 'framer-motion'

interface Props {
    onOpen: () => void
    opened: boolean
}

export default function SlideEnvelope({ onOpen, opened }: Props) {
    return (
        <div className="slide__inner slide__inner--center">
            <div className="envelope-wrapper">
                {!opened && (
                    <motion.p
                        className="envelope-prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        tap to open
                    </motion.p>
                )}

                <motion.div
                    className={`envelope ${opened ? 'envelope--opened' : ''}`}
                    onClick={!opened ? onOpen : undefined}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={!opened ? { scale: 1.03, transition: { duration: 0.2 } } : undefined}
                    whileTap={!opened ? { scale: 0.97 } : undefined}
                    style={{ cursor: opened ? 'default' : 'pointer' }}
                >
                    <div className="envelope__letter-peek">
                        <div className="letter-peek__lines">
                            <div className="letter-peek__line" />
                            <div className="letter-peek__line" />
                            <div className="letter-peek__line" />
                        </div>
                    </div>

                    <div className="envelope__flap">
                        <svg className="envelope__flap-shape" viewBox="0 0 320 130" preserveAspectRatio="none">
                            <path d="M0 130 L160 10 L320 130" fill="#F5EBE0" stroke="#D4C4B0" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="envelope__seal">
                        <svg width="42" height="42" viewBox="0 0 42 42">
                            <circle cx="21" cy="21" r="17" fill="#C4967A" opacity="0.88" />
                            <circle cx="21" cy="21" r="14" fill="none" stroke="#B8836A" strokeWidth="0.5" opacity="0.4" />
                            <path d="M21 29 Q15 23.5 15 19 Q15 15.5 18 15.5 Q20 15.5 21 17.5 Q22 15.5 24 15.5 Q27 15.5 27 19 Q27 23.5 21 29Z" fill="#F5EBE0" opacity="0.7" />
                        </svg>
                    </div>

                    <div className="envelope__body" />
                </motion.div>

                {opened && (
                    <motion.p
                        className="envelope-prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.45 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        style={{ fontStyle: 'italic' }}
                    >
                        opening…
                    </motion.p>
                )}
            </div>
        </div>
    )
}
