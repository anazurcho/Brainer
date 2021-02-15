const router = require("express").Router();
const { createPost, getPostByPostId, getPosts, updatePost, deletePost } = require("./post.controller");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostByPostId);
router.patch("/", updatePost);
router.delete("/", deletePost);

module.exports = router;