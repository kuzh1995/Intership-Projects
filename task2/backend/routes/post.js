const express = require('express');
const router = express.Router();
const Post = require('../models/post');

module.exports = (upload) => {
  // Get all posts
  router.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.json({ message: error.message });
    }
  });

  // Create a new post with image upload
  router.post('/', upload.single('image'), async (req, res) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.file.buffer,
    });

    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.json({ message: error.message });
    }
  });

  return router;
};
