const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const {
  removeFollowFromLists,
  addFollowToLists,
  addAsFriendsUsers,
  removeFriend,
} = require("./functions/userFunctions");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public/default"));

app.use(express.json());
app.use("/auth", authRouter);

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

start();

app.get("/api/validation-token", async (req, res) => {
  const tokenForValidation = req.query;
  let decoded;
  try {
    decoded = jwt.verify(tokenForValidation.value, process.env.SECRET);
    // If token is verified, response to client success true end user's _id
    if (decoded) {
      const { id: userID } = decoded;
      const filter = "-secret";
      const foundUser = await User.findOne({ _id: userID }, filter);
      // const { _id, email, name, surname, role,avatar,background } = foundUser;
      res.json({
        success: true,
        // foundUser: { _id, email, name, surname,role,avatar,background },
        foundUser,
      });
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.log(err);
      res.sendStatus(401);
    } else if (err instanceof jwt.TokenExpiredError) {
      // If token is expired
      console.log(err);
      res.json({ success: false, message: "Token expired" });
    } else {
      console.error(err);
      res.sendStatus(500); // Internal server error for other errors
    }
  }
});

app.get("/api/search/get-all-users", async (req, res) => {
  const users = await User.find({}).limit(100);
  if (users) {
    res.json({ success: true, users });
  } else {
    res.json({
      success: false,
      message: "Something errors on /api/search/get-all-users",
    });
  }
});

app.get("/api/search/get-user-info", async (req, res) => {
  const { profileId } = req.query;
  const exclusions = { secret: 0 };
  if (!profileId) {
    return res.json({ success: false, message: "Profile id is undefined" });
  }
  const user = await User.findOne({ _id: profileId }, exclusions);
  if (!user) {
    res.json({ res, success: false, message: "User was not found" });
  }

  return res.json({ success: true, user });
});
// требуется оптимизация кода
app.post("/api/follow-user", async (req, res) => {
  const { userFollowerId, userFollowedId } = req.body;

  addFollowToLists(res, userFollowerId, userFollowedId);

  return res.json({
    success: true,
    message: "Successful added follower and following",
  });
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

  addAsFriendsUsers(res,acceptedUserId,sentUserId)
});

// требуется оптимизация кода
app.post("/api/remove-friend-user", async (req, res) => {
  const { iniciatorId, userToRemoveId } = req.body;

  removeFriend(res,iniciatorId,userToRemoveId)

  return res.json({
    success: true,
    message: "Successful friend and added to followers",
  });
});
