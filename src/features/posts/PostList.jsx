import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from './postsSlice'
import PostCard from './PostCard'

export default function PostList() {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  if (status !== 'succeeded') {
    return <p>Loading posts...</p>
  }

  return (
    <ul>
      {items.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}