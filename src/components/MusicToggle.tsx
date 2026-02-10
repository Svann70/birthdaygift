interface Props {
    playing: boolean
    visible: boolean
    onToggle: () => void
}

export default function MusicToggle({ playing, visible, onToggle }: Props) {
    if (!visible) return null

    return (
        <button
            className={`music-toggle ${playing ? 'playing' : ''}`}
            onClick={onToggle}
            aria-label="Toggle music"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </svg>
            <span>{playing ? 'on' : 'off'}</span>
        </button>
    )
}
