import express from 'express';
import {getPostBySearch,getPost,getPosts,createPost,commentPost,likePost,updatePost,deletePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/',getPosts);
router.get('/search',getPostBySearch);
router.get('/:id', getPost);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost);

export default router;