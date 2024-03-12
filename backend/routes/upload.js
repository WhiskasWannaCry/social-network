const {Router} = require("express");
const fileUploadMiddleware = require("../Middleware/fileUploadMiddleware");
const { User } = require("../models");
const path = require("path");

const router = Router();

router.post('/upload', fileUploadMiddleware.single('avatar') ,async (req,res) => {
  try {
    const userId = req.query.userId;
    const filePath = req.file.path;

    console.log(filePath)

    if(!userId) {
      res.json({success:false, message: "Error at the time saving img: userId falsy"})
    }

    if(!filePath) {
      return res.json({success:false, message: "Error at the time saving img: filePath falsy"})
    }
    
    const user = await User.findOne({_id:userId})
    if(!user) {
      return res.json({success:false, message: "Error at the time saving img: user wan't found"})
    }

    const relativePath = filePath.replace(path.join(__dirname, "..", "public"), "").replace(/\\/g, "/").replace(/^\//, "");;

    console.log(relativePath)
    
    user.images.avatar = relativePath

    await user.save()

    return res.json({success:true, user})

  } catch(e) {
    console.error("Error on router: ",e)
  }
})

module.exports = router