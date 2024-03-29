const { Router } = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/validation-token", async (req, res) => {
  const tokenForValidation = req.query;
  let decoded;
  try {
    decoded = jwt.verify(tokenForValidation.value, process.env.SECRET);
    // If token is verified, response to client success true end user's _id
    if (decoded) {
      const { id: userID } = decoded;

      const foundUser = await User.findOne({ _id: userID }, {secret:0});
      res.json({
        success: true,
        foundUser,
      });
    }
  } catch (err) {
    console.error(err)
    res.json({success:false, message: err.message})
    // if (err instanceof jwt.JsonWebTokenError) {
    //   console.log(err);
    //   // res.sendStatus(401);
    //   console.log("here1")
    //   res.json({ success: false, message: "JsonWebTokenError" });
    // } else if (err instanceof jwt.TokenExpiredError) {
    //   // If token is expired
    //   console.log(err);
    //   console.log("here2")
    //   res.json({ success: false, message: "Token expired" });
    // } else {
    //   console.error(err);
    //   console.log("here3")
    //   res.sendStatus(500); // Internal server error for other errors
    // }
  }
});

module.exports = router