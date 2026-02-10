import { motion } from 'framer-motion'

export default function SlideThoughts1() {
    const lines = [
        { text: "You've grown this year.", cls: 'thought--large', delay: 0.15 },
        { text: 'Not loudly.', cls: 'thought--small thought--indent', delay: 0.5 },
        { text: 'Just honestly.', cls: 'thought--small thought--indent', delay: 0.8 },
        { text: "And that's my favorite kind.", cls: 'thought--medium thought--right', delay: 1.2 },
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
