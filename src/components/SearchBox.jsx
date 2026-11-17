export default function SearchBox({ value, onChange }) {
  return (
    <label>
      Search posts
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}