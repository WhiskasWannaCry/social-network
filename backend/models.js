const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  primary: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    website: { type: String},
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
  senderID: [{ type: Schema.Types.ObjectId, ref: "User" }],
  recipientID: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      text: { type: String, required: true },
      id: { type: String, required: true },
      date: { type: String, required: true },
      senderID: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      recipientID: [
        { type: Schema.Types.ObjectId, ref: "User", required: true },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema, "users");
const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = { User, Chat };
