import { motion } from 'framer-motion'

export default function SlideBirthday() {
    return (
        <div className="slide__inner slide__inner--center">
            <div className="birthday__content">
                <motion.h1 className="birthday__title"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >Happy Birthday.</motion.h1>
                <motion.div className="birthday__body"
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <p>I'm not good at saying the big things out loud, so I built this instead.</p>
                    <p>You're one of those people who make everything a little lighter just by being around. Not in a loud way — in the kind of way where I only really notice when you're not there.</p>
                    <p>I hope this year treats you the way you treat others: gently, and with more kindness than you probably expect.</p>
                    <p>Thanks for being someone I don't have to perform around. That matters more than I've ever told you.</p>
                    <p className="birthday__sign">— with love, always</p>
                </motion.div>
            </div>
        </div>
    )
}
