import type { ReactNode } from 'react'

type AccordionItemProps = {
  idPrefix: string
  index: number
  title: ReactNode
  body: ReactNode
  open: boolean
  onToggle: () => void
  className?: string
  triggerClassName?: string
  panelClassName?: string
  leading?: ReactNode
  trailing?: ReactNode
}

export function AccordionItem({
  idPrefix,
  index,
  title,
  body,
  open,
  onToggle,
  className,
  triggerClassName,
  panelClassName,
  leading,
  trailing,
}: AccordionItemProps) {
  const panelId = `${idPrefix}-panel-${index}`
  const buttonId = `${idPrefix}-button-${index}`

  return (
    <div className={className}>
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={triggerClassName}
      >
        {leading}
        <span>{title}</span>
        {trailing}
      </button>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={panelClassName}>
        {body}
      </div>
    </div>
  )
}

