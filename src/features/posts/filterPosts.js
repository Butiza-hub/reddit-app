export function filterPosts(posts, term) {
  const query = term.trim().toLowerCase()

  if (query === '') {
    return posts
  }

  return posts.filter((post) => post.title.toLowerCase().includes(query))
}