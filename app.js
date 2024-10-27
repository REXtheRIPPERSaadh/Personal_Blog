const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public')); // Serve static files (CSS)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // For using PUT and DELETE

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Blog Routes
const Blog = require('./models/blog');

// INDEX Route: Show all blogs
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs });
        }
    });
});

// NEW Route: Show form to create new blog
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

// CREATE Route: Add new blog to the database
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// SHOW Route: Show details of one blog post
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', { blog: foundBlog });
        }
    });
});

// EDIT Route: Show edit form for one blog post
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('edit', { blog: foundBlog });
        }
    });
});

// UPDATE Route: Update a particular blog, then redirect somewhere
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});

// DELETE Route: Delete a particular blog, then redirect somewhere
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

