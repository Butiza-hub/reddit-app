import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadPosts } from './postsSlice'
import { selectPostById } from './selectors'

export default function PostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const post = useSelector((state) => selectPostById(state, id))

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  if (!post) {
    return null
  }

  return <h1>{post.title}</h1>
}