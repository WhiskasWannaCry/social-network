const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: String,
  avatar: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
});

const chatSchema = new Schema({
  senderID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  recipientID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      text: { type: String, required: true },
      id: { type: String, required: true },
      date: { type: String, required: true },
      senderID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      recipientID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
  ],
});

const User = mongoose.model("User", userSchema, "users");
const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = { User, Chat };
