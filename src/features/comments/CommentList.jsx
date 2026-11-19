import Markdown from 'react-markdown'
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export default function CommentList({ comments }) {
  return (
    <section>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <article>
                <p>
                  <span>u/{comment.author}</span>
                  <time
                    dateTime={new Date(comment.createdUtc * 1000).toISOString()}
                  >
                    {formatTimeAgo(comment.createdUtc)}
                  </time>
                </p>
                <Markdown>{comment.body}</Markdown>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}