import { motion } from 'framer-motion'

export default function SlideThoughts2() {
    const lines = [
        { text: 'You carry things well,', cls: 'thought--medium', delay: 0.15 },
        { text: 'even when no one notices.', cls: 'thought--small thought--indent', delay: 0.55 },
        { text: 'But I notice.', cls: 'thought--medium thought--right', delay: 1.1 },
    ]

    return (
        <div className="slide__inner slide__inner--left-padded">
            <div className="thoughts__container">
                {lines.map((l, i) => (
                    <motion.p key={i} className={`thought ${l.cls}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: l.delay }}
                    >{l.text}</motion.p>
                ))}
            </div>
        </div>
    )
}
