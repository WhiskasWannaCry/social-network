const {Router} = require("express");
const fileUploadMiddleware = require("../Middleware/fileUploadMiddleware");
const { User } = require("../models");

const router = Router();

router.post('/upload', fileUploadMiddleware.single('avatar') ,async (req,res) => {
  try {
    const userId = req.query.userId;
    const imageType = req.query.imageType;
    // const filePath = req.file.path;
    const file = req.file

    if(!userId) {
      res.json({success:false, message: "Error at the time saving img: userId falsy"})
    }

    // if(!filePath) {
    //   return res.json({success:false, message: "Error at the time saving img: filePath falsy"})
    // }
    if(!file) {
      return res.json({success:false, message: "Error at the time saving img: file falsy"})
    }
    
    const user = await User.findOne({_id:userId},{secret:0})
    if(!user) {
      return res.json({success:false, message: "Error at the time saving img: user wan't found"})
    }

    const relativePath = `${imageType + "s"}/${userId}/${file.filename}`
    
    user.images[imageType] = relativePath

    await user.save()

    return res.json({success:true, user})

  } catch(e) {
    console.error("Error on router: ",e)
  }
})

module.exports = router