import { useState } from 'react'

const URL = 'https://www.reddit.com/r/popular.json?limit=5'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleFetch() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(URL)
      const body = res.ok ? await res.json() : null
      setResult({
        ok: res.ok,
        status: res.status,
        titles: body ? body.data.children.map((c) => c.data.title) : [],
        error: null,
      })
    } catch (err) {
      setResult({ ok: false, status: null, titles: [], error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '40rem' }}>
      <h1>Reddit API test</h1>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch r/popular'}
      </button>
      {result && (
        <section>
          <p>Status: {result.status ?? 'no response'}</p>
          {result.error && <p>Error: {result.error}</p>}
          <ul>
            {result.titles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}