import type { CSSProperties } from 'react'

function splitWords(line: string) {
  return line.split(' ')
}

interface HeroTextAnimationProps {
  titleLines: readonly string[]
  copyLines: readonly string[]
  titleClassName: string
  copyClassName: string
  titleDelayBaseMs?: number
  titleLineStepMs?: number
  charStepMs?: number
  copyDelayBaseMs?: number
  copyLineStepMs?: number
  titleStyle?: CSSProperties
  copyStyle?: CSSProperties
}

export function HeroTextAnimation({
  titleLines,
  copyLines,
  titleClassName,
  copyClassName,
  titleDelayBaseMs = 140,
  titleLineStepMs = 220,
  charStepMs = 26,
  copyDelayBaseMs = 500,
  copyLineStepMs = 120,
  titleStyle,
  copyStyle,
}: HeroTextAnimationProps) {
  return (
    <>
      <h1 className={titleClassName} style={titleStyle}>
        <span className="u-visually-hidden">{titleLines.join(' ')}</span>
        {titleLines.map((line, lineIndex) => (
          <span key={line} className="hero-anim-title-line-wrap" aria-hidden="true">
            <span className="hero-anim-title-line">
              {splitWords(line).map((word, wordIndex, words) => (
                <span key={`${line}-word-${wordIndex}`} className="hero-anim-word-wrap">
                  {word.split('').map((char, charIndex) => (
                    <span key={`${line}-${wordIndex}-${charIndex}`} className="hero-anim-char-wrap">
                      <span
                        className="hero-anim-char"
                        style={{
                          animationDelay: `${titleDelayBaseMs + lineIndex * titleLineStepMs + ((words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex) * charStepMs)}ms`,
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  ))}
                  {wordIndex < words.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </span>
          </span>
        ))}
      </h1>
      <p className={copyClassName} style={copyStyle}>
        <span className="u-visually-hidden">{copyLines.join(' ')}</span>
        {copyLines.map((line, lineIndex) => (
          <span key={line} className="hero-anim-copy-line-wrap" aria-hidden="true">
            <span className="hero-anim-copy-line" style={{ animationDelay: `${copyDelayBaseMs + lineIndex * copyLineStepMs}ms` }}>
              {line}
            </span>
          </span>
        ))}
      </p>
    </>
  )
}
