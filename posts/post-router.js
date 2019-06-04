const express = require('express');

const Posts = require('./post-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);
  
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
    const post = await Posts.add(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new post' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Once again we would want to validate the body here
  const changes = req.body;

  try {
    const count = await Posts.update(id, changes);

    if (count) {
      res.status(201).end();
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update post' });
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Posts.remove(id);

    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;