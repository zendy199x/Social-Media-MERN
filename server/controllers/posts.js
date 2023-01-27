import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import e from "express";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(StatusCodes.CREATED).json(post);
  } catch (err) {
    res.status(StatusCodes.CONFLICT).json({ message: err.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(StatusCodes.OK).json(post);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(StatusCodes.OK).json(post);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatePost);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};
