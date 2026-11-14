// Sample data in the shape the UI needs. All posts are invented.
// Later we can swap fetchPosts for a real Reddit call without
// touching the rest of the app.
const samplePosts = [
  {
    id: 'p1',
    title: 'Finished my first 10k run after six months of training',
    subreddit: 'running',
    author: 'slow_and_steady',
    score: 4210,
    numComments: 312,
  },
  {
    id: 'p2',
    title: 'What is the one tool you wish you had learned sooner?',
    subreddit: 'webdev',
    author: 'tabs_not_spaces',
    score: 1893,
    numComments: 540,
  },
  {
    id: 'p3',
    title: 'Sourdough starter doubled overnight for the first time',
    subreddit: 'breadit',
    author: 'crumb_shot',
    score: 3377,
    numComments: 128,
  },
  {
    id: 'p4',
    title: 'Redux Toolkit finally clicked for me, here is what helped',
    subreddit: 'reactjs',
    author: 'state_of_mind',
    score: 962,
    numComments: 87,
  },
  {
    id: 'p5',
    title: 'Trail map I made for a three-day loop, feedback welcome',
    subreddit: 'hiking',
    author: 'ridgeline_rae',
    score: 2540,
    numComments: 203,
  },
  {
    id: 'p6',
    title: 'My cat has decided the laptop keyboard is her bed',
    subreddit: 'aww',
    author: 'keyboard_cat_owner',
    score: 8820,
    numComments: 415,
  },
]

export function fetchPosts() {
  return Promise.resolve(samplePosts)
}