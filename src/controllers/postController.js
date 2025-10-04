import Post from "../models/Post.js"
import User from "../models/user.js";
import upload from "../config/multerLocal.js";


/**
 * POST /api/posts/
 * create post
 */
export const createPost = async (req, res) => {
  /*try {
    const { content } = req.body;
    let fileUrl = "";

    if(req.file){
      const result = await uploadToCloudinary(req.file, req);
      fileUrl = result.secure_url;
    }

    const newPost = new Post({
      userId:req.user.uid,
      content,
      image:fileUrl
    })
    await newPost.save();
    res.status(201).json(newPost);
    console.log("Posting successfully")
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};*/

try {
  const { content } = req.body;
  let fileUrl = "";
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
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
    const userId = req.user.uid;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const ids = [user._id, ...(user.connections || [])].filter(Boolean);
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

