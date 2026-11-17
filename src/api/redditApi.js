// Sample data in the shape the UI needs. All posts are invented.
// Later we can swap fetchPosts for a real Reddit call without
// touching the rest of the app.
const now = Math.floor(Date.now() / 1000)
const hoursAgo = (hours) => now - hours * 3600

const samplePosts = [
  {
    id: 'p1',
    title: 'New chip design promises a full day of laptop battery life',
    subreddit: 'technology',
    author: 'user123',
    excerpt:
      'A hardware team shared early benchmarks for a low-power chip. ' +
      'The numbers look good, but real-world use will tell.',
    createdUtc: hoursAgo(6),
    score: 245,
    numComments: 38,
  },
  {
    id: 'p2',
    title: 'What is the one tool you wish you had learned sooner?',
    subreddit: 'programming',
    author: 'devFan',
    excerpt:
      'After ten years of coding, mine is the debugger. ' +
      'Curious what saved other people the most time.',
    createdUtc: hoursAgo(8),
    score: 512,
    numComments: 112,
  },
  {
    id: 'p3',
    title: 'Redux Toolkit finally clicked for me, here is what helped',
    subreddit: 'webdev',
    author: 'codeMaster',
    excerpt:
      'Writing one small slice and testing it first made the whole ' +
      'pattern make sense. Notes on what I tried inside.',
    createdUtc: hoursAgo(14),
    score: 198,
    numComments: 67,
  },
  {
    id: 'p4',
    title: 'A slow-burn thriller that deserved a bigger audience',
    subreddit: 'movies',
    author: 'movieLover',
    excerpt:
      'Watched it again last night and the pacing holds up. ' +
      'What is a film you think got overlooked?',
    createdUtc: hoursAgo(12),
    score: 421,
    numComments: 205,
  },
  {
    id: 'p5',
    title: 'Local club wins the regional final in extra time',
    subreddit: 'sports',
    author: 'fieldNotes',
    excerpt:
      'A late goal sealed it after a tense ninety minutes. ' +
      'Photos and the full match recap are in the comments.',
    createdUtc: hoursAgo(16),
    score: 367,
    numComments: 91,
  },
  {
    id: 'p6',
    title: 'Why small teams are moving back to plain server rendering',
    subreddit: 'technology',
    author: 'chipWatcher',
    excerpt:
      'Several teams report simpler deployments and faster pages. ' +
      'Here is a summary of the trade-offs they mention.',
    createdUtc: hoursAgo(20),
    score: 289,
    numComments: 54,
  },
]

export function fetchPosts() {
  return Promise.resolve(samplePosts)
}