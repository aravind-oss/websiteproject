const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-website-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for your data (e.g., a simple blog post)
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the backend of My Website!');
});

// Example API endpoint to create a new post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const httpsOptions = {
    key: fs.readFileSync('path/to/yourdomain.key'),
    cert: fs.readFileSync('path/to/yourdomain.crt')
};

const server = https.createServer(httpsOptions, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
