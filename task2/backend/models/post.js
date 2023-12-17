const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: { type: Buffer },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
