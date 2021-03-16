import express from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost)

export default router;



// Inspired by tutorial located at: https://www.youtube.com/watch?v=ngc9gnGgUdA 