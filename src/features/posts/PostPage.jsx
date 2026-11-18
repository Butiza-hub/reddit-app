import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
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

  function handleTryAgain() {
    dispatch(loadPosts())
  }

  let content

  if (post) {
    content = (
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
  } else if (status === 'failed') {
    content = (
      <div>
        <h1>Something went wrong</h1>
        <p>We couldn&rsquo;t load this post. Please try again.</p>
        <button type="button" onClick={handleTryAgain}>
          Try again
        </button>
      </div>
    )
  } else if (status === 'succeeded') {
    content = <p>Post not found</p>
  } else {
    content = <p>Loading post...</p>
  }

  return (
    <main>
      <Link to="/">Back to feed</Link>
      {content}
    </main>
  )
}