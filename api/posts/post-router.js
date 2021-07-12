const express = require('express');
const Post = require('./post-model');

const router = express.Router();

// MIDDLEWARES, ELSE THE LOGIC GETS VERY REPETITIVE IN THE ENDPOINTS!!
// these could live in a separate module
async function checkId(req, res, next) {
  try {
    const post = await Post.getById(req.params.id)
    if (post) {
      req.post = post; // req.post is used in [GET] api/posts/:id endpoint saving an extra trip to the db
      next();
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) { next(err) }
}

function checkPayload(req, res, next) {
  const { title, contents } = req.body
  if (title && contents) {
    next();
  } else {
    res.status(400).json({ message: 'title and contents are required' });
  }
}

// ENDPOINTS
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.get();
    res.json(posts);
  } catch (err) { next(err); } // use next(err) to avoid repeating the same error logic
});

router.get('/:id', checkId, async (req, res) => {
  // see how skinny the endpoint becomes thanks to middleware?
  res.status(200).json(req.post);
});

router.post('/', checkPayload, async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body) // req.body is sure to have the correct shape
    res.status(201).json(newPost);
  } catch (err) { next(err); }
});

router.put('/:id', checkPayload, checkId, async (req, res, next) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body) // id and body are verified to be good
    res.status(200).json(updatedPost);
  } catch (err) { next(err); }
});

router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const deletedPost = await Post.remove(req.params.id)
    res.status(200).json(deletedPost);
  } catch (err) { next(err); }
});

// THIS ERROR HANDLING MIDDLEWARE NEEDS TO COME AFTER THE ENDPOINTS
// AND IT NEEDS THE `next` PARAMETER EVEN IF IT'S NOT USED!!
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
