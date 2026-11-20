import { Link } from 'react-router-dom'
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export default function PostCard({ post }) {
  const postedAt = new Date(post.createdUtc * 1000).toISOString()

  return (
    <article className="post-card">
      <p className="post-meta">
        <span>r/{post.subreddit}</span>
        <span>u/{post.author}</span>
        <time dateTime={postedAt}>{formatTimeAgo(post.createdUtc)}</time>
      </p>
      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post-excerpt">{post.excerpt}</p>
      <p className="post-stats">
        <span>{`${post.score} points`}</span>
        <span>{`${post.numComments} comments`}</span>
      </p>
    </article>
  )
}