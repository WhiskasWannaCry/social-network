const {Router} = require("express")
const {User} = require("../models")
const mongoose = require("mongoose");

const router = Router()


router.get("/get-user-profile-info", async (req, res) => {
  const { profileId } = req.query;
  const exclusions = { secret: 0 };
  
  if (!profileId) {
    return res.json({ success: false, message: "Profile id is undefined" });
  }

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    return res.json({ success: false, message: "Invalid profile id" });
  }

  try {
    const user = await User.findOne({ _id: profileId }, exclusions);
    if (!user) {
      res.json({ res, success: false, message: "User was not found" });
    }

    return res.json({ success: true, user });
  } catch (e) {
    console.error(e);
    res.json({ res, success: false, message: e });
  }
});

module.exports = router;