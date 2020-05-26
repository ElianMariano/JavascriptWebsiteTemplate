const express = require('express');
const router = express.Router();

router.post('/sessions', (req, res) => {
    console.log("Session");
    res.send({'id': 'newid'});
});

router.post('/sign-in', (req, res) => {
    console.log("Sign in");
    res.send({'id': 'new user'});
});

// Posts routes

router.get('/post-profile', (req, res) => {
    console.log("Post profile");
    res.send({'post': 'Post profile'});
});

router.post('/post-create', (req, res) => {
    console.log("Post create");
    res.send({'post': 'Post create'});
});

router.post('/post-edit', (req, res) => {
    console.log("Post edit");
    res.send({'post': 'Post edit'});
});

router.delete('/post-delete', (req, res) => {
    console.log("Post delete");
    res.send({'post': 'Post delete'});
});

// Categories routes

router.get('/categories-profile', (req, res) => {
    console.log("Categories profile");
    res.send({'categories': 'Categories profile'});
});

router.post('/categories-create', (req, res) => {
    console.log("Categories create");
    res.send({'categories': 'Categories create'});
});

router.post('/categories-edit', (req, res) => {
    console.log("Categories edit");
    res.send({'categories': 'Categories edit'});
});

router.delete('/categories-delete', (req, res) => {
    console.log("Categories delete");
    res.send({'categories': 'Categories delete'});
});

module.exports = router;