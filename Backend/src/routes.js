const express = require('express');
const router = express.Router();

const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');
const CategoriesController = require('./Controllers/CategoriesController');

router.post('/sessions', UserController.sessions);
router.post('/sign-in', UserController.sign_in);

// Posts routes
router.get('/post-profile', PostController.post_profile);
router.post('/post-create', PostController.post_create);
router.post('/post-edit', PostController.post_edit);
router.delete('/post-delete', PostController.post_delete);

// Categories routes

router.get('/categories-profile', CategoriesController.categories_profile);
router.post('/categories-create', CategoriesController.categories_create);
router.post('/categories-edit', CategoriesController.categories_edit);
router.delete('/categories-delete', CategoriesController.categories_delete);

module.exports = router;