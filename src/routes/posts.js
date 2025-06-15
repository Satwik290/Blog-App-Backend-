const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/Auth");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postscontroller");

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes (require authentication)
router.post("/", userAuth, createPost);
router.patch("/:id", userAuth, updatePost);
router.delete("/:id", userAuth, deletePost);

module.exports = router;