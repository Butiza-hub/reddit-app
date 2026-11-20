import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { loadPosts } from './postsSlice'
import { selectPostById } from './selectors'
import { clearComments, loadComments } from '../comments/commentsSlice'
import CommentList from '../comments/CommentList'

export default function PostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.posts.status)
  const post = useSelector((state) => selectPostById(state, id))
  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadComments(id))

    return () => {
      dispatch(clearComments())
    }
  }, [dispatch, id])

  function handleTryAgain() {
    dispatch(loadPosts())
  }

  let commentsSection

  if (comments.status === 'failed') {
    commentsSection = (
      <p className="status-message">We couldn&rsquo;t load the comments.</p>
    )
  } else if (comments.status === 'succeeded') {
    commentsSection = <CommentList comments={comments.items} />
  } else {
    commentsSection = <p className="status-message">Loading comments...</p>
  }

  let content

  if (post) {
    content = (
      <>
        <article className="post-detail">
          <p className="post-meta">
            <span>{`r/${post.subreddit}`}</span>
            <span>{`u/${post.author}`}</span>
          </p>
          <h1 className="post-detail-title">{post.title}</h1>
          <p className="post-body">{post.excerpt}</p>
          <p className="post-stats">
            <span>{`${post.score} points`}</span>
            <span>{`${post.numComments} comments`}</span>
          </p>
        </article>
        {commentsSection}
      </>
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
    content = <p className="status-message">Post not found</p>
  } else {
    content = <p className="status-message">Loading post...</p>
  }

  return (
    <main>
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Back to feed
      </Link>
      {content}
    </main>
  )
}