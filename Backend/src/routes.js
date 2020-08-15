const express = require('express');
const router = express.Router();

const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');
const CategoriesController = require('./Controllers/CategoriesController');
const PostParagraphController = require('./Controllers/PostParagraphController');

// User routes
router.post('/logout', UserController.logout);
router.post('/login', UserController.login);
router.post('/sign-up', UserController.sign_up);

// Posts routes
router.get('/post-profile', PostController.post_profile);
router.post('/post-create', PostController.post_create);
router.get('/post/:title', PostController.post_show);
router.post('/post-edit', PostController.post_edit);
router.get('/post-search', PostController.post_search);
router.delete('/post-delete', PostController.post_delete);

// Categories routes
router.get('/categories-profile', CategoriesController.categories_profile);
router.post('/categories-create', CategoriesController.categories_create);
router.post('/categories-edit', CategoriesController.categories_edit);
router.delete('/categories-delete', CategoriesController.categories_delete);

// Post Paragraph routes
router.get('/post-paragraph', PostParagraphController.index);
router.post('/post-paragraph', PostParagraphController.create);
router.post('/post-paragraph-edit', PostParagraphController.update);
router.delete('/post-paragraph', PostParagraphController.delete);

module.exports = router;