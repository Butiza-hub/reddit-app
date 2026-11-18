import { Link, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './components/SearchBox'
import CategoryBar from './components/CategoryBar'
import PostList from './features/posts/PostList'
import { setCategory, setSearchTerm } from './features/filters/filtersSlice'

function Feed() {
  const dispatch = useDispatch()
  const { searchTerm, category } = useSelector((state) => state.filters)

  return (
    <>
      <header>
        <h1>Reddit App</h1>
        <SearchBox
          value={searchTerm}
          onChange={(term) => dispatch(setSearchTerm(term))}
        />
      </header>
      <main>
        <CategoryBar
          selected={category}
          onSelect={(value) => dispatch(setCategory(value))}
        />
        <PostList />
      </main>
    </>
  )
}

function PostPage() {
  return (
    <main>
      <Link to="/">Back to feed</Link>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  )
}