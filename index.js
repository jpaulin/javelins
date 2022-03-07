// Six to seven lines server (backend).
// README:
// First install Node, and now you have
// 'npm' tool. Use: 'npm install express' in your working folder. Now you have express.
const express = require('express') // let's import
// We make one instance of the Express server, by calling it like this:
const app = express()

// Which port server listens to incoming HTTP requests
const port = 3000

// Storage for 2 timestamps, to calculate difference (elapsed time)
let perfStamps = { beginMillis: 0, endMillis: 0 }
perfStamps.beginMillis = Date.now()

function showPerformance() {
  let diff = perfStamps.endMillis-perfStamps.beginMillis
  console.log(`Server started in ${diff} milliseconds..`)
}

// The styles engine has CSS in JS variables, so we can use them to decorate
// components within HTML printing. The server outputs HTML, and composes the
// output strings using both fixed text, and variables.

// Produces nav links, in a container. PREV and NEXT buttons
// Given 'c' = current page, we will give links to c-1 and c+1
function navlinks(nowPageId) {
  let crt = '' // Curry string to here
  let n = undefined
  if (typeof nowPageId === 'string') {
    n = parseInt(nowPageId)
  }
  if (typeof nowPageId === 'number') {
    n = nowPageId
  }
  /*
  let prevBtn = `<div class=${navBtnStyle}><< PREV</div>`
  let nextBtn = `<div class=${navBtnStyle}>>> NEXT</div>`
  crt += `<div class={$navContainerClass}> ${prevBtn} ${nextBtn}</div>`
  return crt */
  return '<div class="navlinksBox"><< Prev | Next >></div>'
}

function getCompletePostHtml (blogPostId) {
  let cur = ''
  cur = '<!DOCTYPE html>'
  cur += '<html lang="en">'
  cur += '<head>'
  cur += '<meta charset="UTF-8">'
  cur += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
  cur += '<title>a post</title>'
  cur += '</head>'
  cur += '<body>'
  // Inject post here:
  const postText = posts[blogPostId]
  cur += postText
  cur += navlinks(blogPostId)

  cur += '</body></html>'
  return cur
}

// This is our blog's posts, so far. They could be complex, but this is a simple example.
// If you had more, just make them strings like this. Strings can be long in JavaScript!
const posts = [
  'First post contains this line!',
  'Second post',
  'Third post!',
  'Greetings is the fourth post!',
  'Fifth post!']

// Route '/' => shows a welcome text.
// Routes are explained in https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.send('SIXLINE BLOG. I am all good!')
})

// First and only route. We respond at http://server/post/?id=1
app.get('/post/', (req, res) => {
  let postId = parseInt(req.query.id)
  if (typeof postId !== 'number') {
    res.send('Internal server query parsing problem. Try again!')
    return
  }
  // Array out of bounds test, for not crashing our server
  console.log(`Demanded post: ${postId} and my blog has ${posts.length} posts. `)
  if (postId <= posts.length) 
    postId -= 1
    res.send(getCompletePostHtml(postId))
  } else {
    res.send('No such post!')
  }
})

app.listen(port, () => {
  perfStamps.endMillis = Date.now()
  showPerformance()
  console.log(`Javelins server listening at http://localhost:${port}`)
})
