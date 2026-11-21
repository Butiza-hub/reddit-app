import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { loadPosts } from './postsSlice'
import { selectPostById } from './selectors'
import { clearComments, loadComments } from '../comments/commentsSlice'
import CommentList from '../comments/CommentList'
import StatusPanel from '../../components/StatusPanel'

export default function PostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  function handleGoBack() {
    navigate('/')
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
      <StatusPanel
        icon="error"
        role="alert"
        headingLevel={1}
        title="Something went wrong"
        message="We couldn’t load this post. Please try again."
        actionLabel="Try again"
        onAction={handleTryAgain}
      />
    )
  } else if (status === 'succeeded') {
    content = (
      <StatusPanel
        icon="search"
        headingLevel={1}
        title="Post not found"
        message="The post you’re looking for might have been removed or no longer exists."
        actionLabel="Go back to feed"
        onAction={handleGoBack}
      />
    )
  } else {
    content = <StatusPanel icon="loading" role="status" title="Loading post..." />
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