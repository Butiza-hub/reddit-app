const categories = [
  { value: 'all', label: 'All' },
  { value: 'technology', label: 'Technology' },
  { value: 'programming', label: 'Programming' },
  { value: 'webdev', label: 'Web Dev' },
  { value: 'movies', label: 'Movies' },
  { value: 'sports', label: 'Sports' },
]

export default function CategoryBar({ selected, onSelect }) {
  return (
    <div role="group" aria-label="Categories">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected === value}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}