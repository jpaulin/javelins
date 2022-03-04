// Six to seven lines server (backend).
// README:
// First install Node, and now you have
// 'npm' tool. Use: 'npm install express' in your working folder. Now you have express.
const express = require('express') // let's import
// We make one instance of the Express server, by calling it like this:
const app = express()
const port = 3000

function getCompletePostHtml (blogPostId) {
  let cur = ''
  cur = '<HTML><BODY>'
  let postText = posts[blogPostId]
  cur += postText
  cur += '</BODY></HTML>'
  return cur
}

// This is our blog's posts, so far. They could be complex, but this is a simple example.
// If you had more, just make them strings like this. Strings can be long in JavaScript!
/* Muted during module trial 
const posts = [
  'First post contains this line!',
  'Second post',
  'Third post!',
  'Greetings is the fourth post!',
  'Fifth post!']
*/

// Instead we are importing data from the data.js datamodule

var data = require('./data.js')

const posts = data

// For debugging purposes we print the object to console 
// console.log(JSON.stringify(posts))

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
  if (postId <= posts.length) {
    postId -= 1 //indeksitarkistus
    res.send(getCompletePostHtml(postId))
  } else {
    res.send(`Post ${postId} not available`)
  }
})

app.listen(port, () => console.log(`Javelins server listening at http://localhost:${port}`))
