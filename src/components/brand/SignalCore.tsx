type SignalCoreProps = {
  className?: string
  label?: string
}

export function SignalCore({ className = '', label = 'Vynho signal' }: SignalCoreProps) {
  return (
    <div className={`signal-core ${className}`.trim()} role="img" aria-label={label}>
      <svg className="signal-core-svg" viewBox="0 0 640 640" fill="none" aria-hidden="true">
        <circle className="signal-core-orbit signal-core-orbit-outer" cx="320" cy="320" r="244" />
        <circle className="signal-core-orbit signal-core-orbit-mid" cx="320" cy="320" r="174" />
        <ellipse className="signal-core-orbit signal-core-orbit-tilt" cx="320" cy="320" rx="94" ry="238" />
        <path className="signal-core-beam signal-core-beam-left" d="M132 168L320 486" />
        <path className="signal-core-beam signal-core-beam-right" d="M508 168L320 486" />
        <path className="signal-core-v" d="M218 248L320 420L422 248" />
        <circle className="signal-core-node signal-core-node-top" cx="320" cy="76" r="8" />
        <circle className="signal-core-node signal-core-node-left" cx="132" cy="168" r="6" />
        <circle className="signal-core-node signal-core-node-right" cx="508" cy="168" r="6" />
        <circle className="signal-core-node signal-core-node-center" cx="320" cy="420" r="12" />
      </svg>
      <span className="signal-core-scan" aria-hidden="true" />
      <span className="signal-core-caption" aria-hidden="true">V / SIGNAL 01</span>
    </div>
  )
}
