interface Props {
    current: number
    total: number
}

export default function SlideIndicator({ current, total }: Props) {
    return (
        <div className="slide-indicator">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`slide-dot ${i === current ? 'slide-dot--active' : ''}`}
                />
            ))}
        </div>
    )
}
