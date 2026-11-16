import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from './postsSlice'

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
          <h2>{post.title}</h2>
          <p>
            r/{post.subreddit} by {post.author} · {post.score} points ·{' '}
            {post.numComments} comments
          </p>
        </li>
      ))}
    </ul>
  )
}