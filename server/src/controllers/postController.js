import Post from "../models/Post.js"
import User from "../models/user.js";

/**
 * POST /api/posts/
 * create post
 */
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = "";

    // ✅ upload image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "global_connect/posts",
      });
      imageUrl = result.secure_url;
    }

    // ✅ attach logged-in user
    const post = new Post({
      userId: req.user._id,   // <-- this fixes the error
      content,
      image: imageUrl,
    });

    await post.save();
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
    if (!user) return res.status(404).json({ msg: "User not found" });

    const ids = [user._id, ...user.connections];
    const posts = await Post.find({ userId: { $in: ids } })
      .sort({ createdAt: -1 })
      .populate("userId", "name profilePic");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * POST /api/posts/:id/like
 */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

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
    res.status(500).json({ msg: err.message });
  }
};

/**
 * POST /api/posts/:id/comment
 */
export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    post.comments.push({ userId: req.user._id, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
