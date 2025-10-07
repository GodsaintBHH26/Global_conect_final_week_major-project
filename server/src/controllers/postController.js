import Post from "../models/Post.js";
import User from "../models/user.js";
import { uploadToCloudinary } from "../utils/multer.js";

/**
 * POST /api/posts/
 * create post
 */
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let fileUrl = "";
    if (req.file) {
      fileUrl =`/global_connect/posts/${req.file.filename}`
    }

    const newPost = new Post({
      userId: req.user.uid,
      content,
      image: fileUrl,
    });
    await newPost.save();
    res.status(201).json({
      newPost,
      message: "File uploaded successfully",
      post:newPost,
    });
    console.log("Made the post successfully");
  } catch (err) {
    console.log(err)
    res.status(500).json({ success:false, msg: err.message });
  }
};

/**
 * GET /api/posts/feed/:userId
 * returns posts by user and connections sorted by newest
 */
export const getFeed = async (req, res) => {
  try {
    const userId = req.user.uid;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    let posts = [];
    const connections = user.connections || [];

    if (connections.length == 0) {
      posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("userId", "name profilePic");
    } else {
      const connIds = [user._id, ...connections].filter(Boolean);
      const connPosts = await Post.find({ userId: { $in: connIds } })
        .sort({ createdAt: -1 })
        .populate("userId", "name profilePic");
      const otherPosts = await Post.find({ userId: { $nin: connIds } })
        .sort({ createdAt: -1 })
        .populate("userId", "name profilePic");

      posts = [...connPosts, ...otherPosts];
    }

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

    const userId = req.user.uid;
    if (post.likes.includes(userId)) {
      // unlike
      post.likes = post.likes.filter((id) => id.toString() !== uid.toString());
    } else {
      post.likes.push(userId);
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
