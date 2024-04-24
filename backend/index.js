const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");
const userValidRouter = require("./routes/userValidation");
const searchUsersRouter = require("./routes/searchUsers");
const profileInfoRouter = require("./routes/profileInfo");
const postsRouter = require("./routes/posts");

const path = require("path");

const cors = require("cors");
const { User } = require("./models");
const {
  removeFollowFromLists,
  addFollowToLists,
  addAsFriendsUsers,
  removeFriend,
} = require("./functions/userFunctions");
const startSocketServer = require("./socketServer");

require("dotenv").config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:3002', // работает локально
  // origin: 'http://46.37.194.186:3002/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// Создаю статику для картинок аватарок и постов
app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));
app.use(
  "/backgrounds",
  express.static(path.join(__dirname, "public", "backgrounds"))
);
app.use("/posts", express.static(path.join(__dirname, "public", "posts")));
app.use("/msg-images", express.static(path.join(__dirname, "public", "msg-images")));
app.use(express.static("public/default"));

app.use(express.json());

// Auth routes
app.use("/auth", authRouter);

// API routes
app.use("/api", uploadRouter);
app.use("/api", uploadRouter);
app.use("/api", userValidRouter);
app.use("/api", searchUsersRouter);
app.use("/api", profileInfoRouter);
app.use("/api/posts/", postsRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    ".env Error: Variable 'MONGO_URL' is not defined or does not exist"
  );
}
if (!PORT) {
  throw new Error(
    ".env Error: Variable 'PORT'  is not defined or does not exist"
  );
}
// Функция которая подлключается к базе данных монго
async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server has been conected to Mongo DB");

    app.listen(PORT, () => {
      console.log("Server has been started on port:", PORT);
    });
  } catch (e) {
    console.log("Server error: ", e);
    process.exit(1);
  }
}
// Starting default server
start();

// Starting Socket server
startSocketServer();

// требуется оптимизация кода
app.post("/api/follow-user", async (req, res) => {
  try {
    const { userFollowerId, userFollowedId } = req.body;

    addFollowToLists(res, userFollowerId, userFollowedId);
  } catch (e) {
    console.error(e);
  }
});
// требуется оптимизация кода
app.post("/api/unfollow-user", async (req, res) => {
  const { userFollowerId, userFollowedId } = req.body;

  removeFollowFromLists(res, userFollowerId, userFollowedId);

  return res.json({
    success: true,
    message: "Successful removed follower and following",
  });
});

// требуется оптимизация кода
app.post("/api/add-as-friend-user", async (req, res) => {
  const { acceptedUserId, sentUserId } = req.body;

  addAsFriendsUsers(res, acceptedUserId, sentUserId);
});

// требуется оптимизация кода
app.post("/api/remove-friend-user", async (req, res) => {
  const { iniciatorId, userToRemoveId } = req.body;

  removeFriend(res, iniciatorId, userToRemoveId);

  return res.json({
    success: true,
    message: "Successful friend and added to followers",
  });
});

// требуется оптимизация кода
app.post("/api/change-user-info", async (req, res) => {
  const { changedFields, userId } = req.body;
  if (!userId) {
    return res.json({ success: false, message: "User id is falsy" });
  }

  const {
    name,
    surname,
    website,
    city,
    description,
    dateOfBirth,
    avatar,
    sex,
  } = changedFields;

  if (
    !name &&
    !surname &&
    !website &&
    !city &&
    !description &&
    !dateOfBirth &&
    !avatar &&
    !sex
  ) {
    return res.json({ success: false, message: "Nothing to change" });
  }

  const exclusions = { secret: 0 };
  const user = await User.findOne({ _id: userId }, exclusions);

  if (!user) {
    return res.json({ success: false, message: "User wasn't found" });
  }
  if (name) {
    user.primary.name = name;
  }
  if (surname) {
    user.primary.surname = surname;
  }
  if (website) {
    user.primary.website = website;
  }
  if (description) {
    user.primary.description = description;
  }
  if (dateOfBirth) {
    user.primary.dateOfBirth = dateOfBirth;
  }

  if (sex) {
    user.primary.sex = sex;
  }

  await user.save();

  return res.json({ success: true, user });
});
