import Markdown from 'react-markdown'
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export default function CommentList({ comments }) {
  return (
    <section className="comments">
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p className="status-message">No comments yet.</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <article className="comment">
                <p className="post-meta">
                  <span>u/{comment.author}</span>
                  <time
                    dateTime={new Date(comment.createdUtc * 1000).toISOString()}
                  >
                    {formatTimeAgo(comment.createdUtc)}
                  </time>
                </p>
                <div className="comment-body">
                  <Markdown>{comment.body}</Markdown>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}