const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  primary: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date },
    sex: { type: String },
    email: { type: String, required: true },
    website: { type: String },
    description: { type: String },
  },
  images: {
    avatar: { type: String, required: true },
    background: { type: String, required: true },
  },
  socialContacts: {
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  secret: {
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
});

const chatSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      text: { type: String, required: true },
      id: { type: String, required: true },
      date: { type: Date, required: true },
      sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
      recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
      read: { type: Boolean, required: true },
      image: { type: String },
    },
  ],
});

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  text: String,
  image: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema, "users");
const Chat = mongoose.model("Chat", chatSchema, "chats");
const Post = mongoose.model("Post", postSchema, "posts");

module.exports = { User, Chat, Post };
