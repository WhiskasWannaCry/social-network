const { Router } = require("express");
const { User, Post } = require("../models");
const mongoose = require("mongoose");

const router = Router();

router.get("/get-posts", async (req, res) => {
  const { filter } = req.query;

  try {
    let allPosts;

    allPosts = await Post.find(filter)
      .populate({
        path: "author",
        select: "-secret",
      })
      .exec();

    if (!allPosts) {
      return res.json({
        success: false,
        message: "Something wrong on server(get all user posts)",
      });
    }

    return res.json({
      success: true,
      allPosts,
    });
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

    let allPosts;

    if (location === "profile") {
      allPosts = await Post.find({ author: profileId })
        .populate({
          path: "author",
          select: "-secret",
        })
        .exec();
    }

    if (location === "feed") {
      allPosts = await Post.find({})
        .populate({
          path: "author",
          select: "-secret",
        })
        .exec();
    }

    if (!allPosts) {
      return res.json({
        success: false,
        message: "Something wrong on server(get all user posts)",
      });
    }

    return res.json({
      success: true,
      allPosts,
    });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: "Caught error on server (new-post)",
    });
  }
});

router.post("/post-like", async (req, res) => {
  const { profileId, postId} = req.body;
  try {
    const post = await Post.findOne({_id:postId})
    if(!post) {
      return res.json({
        success: false,
        message: "Caught error on server (post-like), post not found",
      });
    }
    const postIsLiked = post.likes.findIndex(likerId => likerId.toString() === profileId) !== -1;

    if(!postIsLiked) {
      post.likes.push(profileId)
    }
    if(postIsLiked) {
      const likerIdx = post.likes.findIndex(likerId => likerId === profileId)
      post.likes.splice(likerIdx,1)
    }
    
    await post.save()

    return res.json({
      success: true,
      likes:post.likes,
    });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: "Caught on server (new-post)",
    });
  }
});

module.exports = router;
