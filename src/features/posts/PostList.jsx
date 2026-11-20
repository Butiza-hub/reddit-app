import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from './postsSlice'
import { selectVisiblePosts } from './selectors'
import { setSearchTerm } from '../filters/filtersSlice'
import PostCard from './PostCard'
import StatusPanel from '../../components/StatusPanel'

export default function PostList() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.posts.status)
  const posts = useSelector(selectVisiblePosts)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  function handleClearSearch() {
    dispatch(setSearchTerm(''))
  }

  function handleTryAgain() {
    dispatch(loadPosts())
  }

  if (status === 'failed') {
    return (
      <StatusPanel
        icon="error"
        role="alert"
        title="Something went wrong"
        message="We couldn’t load the posts. Please try again."
        actionLabel="Try again"
        onAction={handleTryAgain}
      />
    )
  }

  if (status !== 'succeeded') {
    return <StatusPanel icon="loading" role="status" title="Loading posts..." />
  }

  if (posts.length === 0) {
    return (
      <StatusPanel
        icon="search"
        title="No posts found"
        message="Try a different search term."
        actionLabel="Clear search"
        onAction={handleClearSearch}
      />
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