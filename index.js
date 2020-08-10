const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
let posts = [ ]
let postID = 0
app.get('/', (req, res) => {
    res.render('posts', {
      posts
    })
})

app.get('/addpost', (req, res) => {
  res.render('addpost')
})

app.post('/addpost', (req, res) => {
  postID++
  posts.push({
    id: postID,
    ...req.body})
  res.send(true)
})

app.get('/post/:id', (req, res) => {
  const idx = parseInt(req.params.id)
 const post = posts.find(post => {return post.id == idx})
  res.render('post', {
    post
  })
})

const port = 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}`))