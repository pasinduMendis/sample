const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  image: { type: String, required: false },
  blogId: { type: String, required: true },
  author: {
    type: {
      name: { type: String, required: true },
      authorId: { type: String, required: true },
    },
  },
});

module.exports = mongoose.model('Blogs', blogSchema)
