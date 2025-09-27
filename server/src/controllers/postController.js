import Post from "../models/Post.js"
import User from "../models/user.js";

/**
 * POST /api/posts/
 * create post
 */
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await Post.create({ userId: req.user._id, content, image });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/posts/feed/:userId
 * returns posts by user and connections sorted by newest
 */
export const getFeed = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ids = [user._id, ...user.connections];
    const posts = await Post.find({ userId: { $in: ids } })
      .sort({ createdAt: -1 })
      .populate("userId", "name profilePic");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/posts/:id/like
 */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const uid = req.user._id;
    if (post.likes.includes(uid)) {
      // unlike
      post.likes = post.likes.filter((id) => id.toString() !== uid.toString());
    } else {
      post.likes.push(uid);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/posts/:id/comment
 */
export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.comments.push({ userId: req.user._id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
