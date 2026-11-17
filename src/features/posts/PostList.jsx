import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from './postsSlice'
import { selectVisiblePosts } from './selectors'
import { setCategory, setSearchTerm } from '../filters/filtersSlice'
import PostCard from './PostCard'

export default function PostList() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.posts.status)
  const posts = useSelector(selectVisiblePosts)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  function handleShowAll() {
    dispatch(setSearchTerm(''))
    dispatch(setCategory('all'))
  }

  if (status !== 'succeeded') {
    return <p>Loading posts...</p>
  }

  if (posts.length === 0) {
    return (
      <div>
        <p>No posts match your search.</p>
        <button type="button" onClick={handleShowAll}>
          Show all posts
        </button>
      </div>
    )
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}