import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadPosts } from './postsSlice'
import { selectPostById } from './selectors'

export default function PostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.posts.status)
  const post = useSelector((state) => selectPostById(state, id))

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  if (!post) {
    if (status === 'succeeded') {
      return <p>Post not found</p>
    }
    return <p>Loading post...</p>
  }

  return (
    <article>
      <p>
        <span>{`r/${post.subreddit}`}</span>
        <span>{`u/${post.author}`}</span>
      </p>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <p>
        <span>{`${post.score} points`}</span>
        <span>{`${post.numComments} comments`}</span>
      </p>
    </article>
  )
}