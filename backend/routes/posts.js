const { Router } = require("express");
const { User, Post } = require("../models");
const mongoose = require("mongoose");

const router = Router();

router.get("/get-posts", async (req, res) => {
  const { profileId, location } = req.query;

  if (!profileId) {
    return res.json({ success: false, message: "Profile id is undefined" });
  }

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    return res.json({ success: false, message: "Invalid profile id" });
  }

  if (!location) {
    return res.json({ success: false, message: "Invalid location" });
  }

  try {
    const posts = await Post.find({ authorID: profileId });
    if (!posts) {
      res.json({ res, success: false, message: "User was not found" });
    }

    return res.json({ success: true, user });
  } catch (e) {
    console.error(e);
    res.json({ res, success: false, message: e });
  }
});

router.post("/new-post", async (req, res) => {
  const { profileId, location, postData } = req.body;
  try {
    if (!profileId || !location) {
      return res.json({
        success: false,
        message: "Some fields is falsy",
      });
    }

    const newPost = new Post(postData);

    await newPost.save();

    const allUserPosts = await Post.find({authorID: profileId});

    if(!allUserPosts) {
      return res.json({
        success: false,
        message: "Something wrong on server(get all user posts)",
      });
    }

    return res.json({
      success: true,
      allUserPosts,
    });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: e,
    });
  }
});

module.exports = router;
