const express = require('express');

// Import the post model
const Post = require('./post-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
  
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get post' });
  }
});

router.post('/', async (req, res) => {
  // We would want to validate the body here but are skipping this step to focus on db methods
  const postData = req.body;

  try {
    const post = await Post.add(postData);
    res.status(201).json(post);
  } catch (err) {
    console.log('POST err', err);
    res.status(500).json({ message: 'Failed to create new post' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Once again we would want to validate the body here
  const changes = req.body;

  try {
    // update resolves to a count of records updated
    const count = await Post.update(id, changes);

    if (count) {
      res.json({ updated: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    console.log('PUT error', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // remove resolves to a count of records removed
    const count = await Post.remove(id);

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;