const Post = require("../models/post");
const { validatePostData } = require("../utils/validation");

// Create a new post
const createPost = async (req, res, next) => {
  try {
    validatePostData(req);
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user._id,
    });

    await post.save();
    res.status(201).json({ success: true, message: "Post created successfully", post });
  } catch (err) {
    next(err);
  }
};

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName emailId")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

// Get a single post by its ID
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "firstName lastName emailId");
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "User not authorized to update this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    next(err);
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "User not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };