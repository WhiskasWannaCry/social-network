const { User } = require("./models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect fields", errors });
      }
      const { name, surname, email, password, role } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          success: false,
          message: "User with this email is already registered",
          candidate,
        });
      }
      const hashPassword = bcrypt.hashSync(password, 7);

      let user = new User({
        primary: {
          name,
          surname,
          dateOfBirth: "",
          email,
          website: "",
          description: "",
        },
        images: {
          avatar: "user-avatar.png",
          background: "user-background.jpg",
        },
        socialContacts: {
          friends: [],
          followers: [],
          following: [],
        },
        secret: {
          password: hashPassword,
          role,
        },
      });
      await user.save();
      const token = generateAccessToken(user._id);
      return res.json({
        success: true,
        message: "User successful registered!",
        token,
        user: {
          _id: user._id,
          primary: user.primary,
          images: user.images,
          socialContacts: user.socialContacts,
        },
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "Registration error",
        error: e.toString(),
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email)
      let user = await User.findOne({ 'primary.email':email });
      if (!user) {
        return res.json({
          success: false,
          message: `User with e-mail (${email}) is not found`,
        });
      }
      const token = (user && generateAccessToken(user._id)) || null;
      const validPassword = bcrypt.compareSync(password, user.secret.password);
      if (!validPassword) {
        return res.json({ success: false, message: "Password is not valid" });
      }
      return res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          primary: user.primary,
          images: user.images,
          socialContacts: user.socialContacts,
        },
      });
    } catch (e) {
      console.log(e)
      res.json({
        success: false,
        message: "Something happened on server",
        errors: e,
      });
    }
  }
}

module.exports = new authController();
