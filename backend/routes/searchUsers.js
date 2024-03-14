const {Router} = require("express")
const {User} = require("../models")

const router = Router()

router.get("/search/get-all-users", async (req, res) => {
  const users = await User.find({},{secret:0}).limit(100);
  if (users) {
    res.json({ success: true, users });
  } else {
    res.json({
      success: false,
      message: "Something errors on /api/search/get-all-users",
    });
  }
});

module.exports = router;