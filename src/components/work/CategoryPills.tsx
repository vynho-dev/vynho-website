interface CategoryPillsProps {
  items: string[]
  active: string
  onSelect: (item: string) => void
}

export function CategoryPills({ items, active, onSelect }: CategoryPillsProps) {
  return (
    <div className="vwk-pills" role="tablist" aria-label="Work categories">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={item === active ? 'vwk-pill is-active' : 'vwk-pill'}
          onClick={() => onSelect(item)}
          role="tab"
          aria-selected={item === active}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
