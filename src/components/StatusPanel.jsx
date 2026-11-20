const icons = {
  error: (
    <>
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 10v5M12 18v.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  loading: <path d="M12 3a9 9 0 1 0 9 9" />,
}

export default function StatusPanel({
  icon,
  title,
  message,
  headingLevel = 2,
  actionLabel,
  onAction,
  role,
}) {
  const Heading = `h${headingLevel}`

  return (
    <div className="status-panel" role={role}>
      <svg
        className={`status-icon status-icon-${icon}`}
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {icons[icon]}
      </svg>
      <Heading className="status-title">{title}</Heading>
      {message && <p className="status-text">{message}</p>}
      {actionLabel && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}