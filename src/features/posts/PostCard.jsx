import { Link } from 'react-router-dom'
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export default function PostCard({ post }) {
  const postedAt = new Date(post.createdUtc * 1000).toISOString()

  return (
    <article>
      <p>
        <span>r/{post.subreddit}</span>
        <span>u/{post.author}</span>
        <time dateTime={postedAt}>{formatTimeAgo(post.createdUtc)}</time>
      </p>
      <h2>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <p>
        <span>{`${post.score} points`}</span>
        <span>{`${post.numComments} comments`}</span>
      </p>
    </article>
  )
}