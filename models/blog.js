const mongoose = require('mongoose');

// Blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    image: String, // URL for the image
    body: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);

