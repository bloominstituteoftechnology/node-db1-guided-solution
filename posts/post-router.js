const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db('posts');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // returns an array containing a single post
    const [ post ] = await db('posts').where({ id });
  
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
      // the post object's keys must match the columns in the database table
    const [ id ] = await db('posts').insert(post);
    res.status(201).json({ id });
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
    const count = await db('posts')
      .where({ id })
      .update(changes);;

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
    const count = await db('posts')
      .where({ id })
      .del();

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