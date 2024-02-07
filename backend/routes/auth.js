const Router = require('express')
const router = new Router()
const controller = require('../authController')
const {check} = require("express-validator")
const authMiddleware = require('../Middleware/authMiddleware')

router.post("/registration",[
  check("name","Username can't be empty").notEmpty(),
  check("email","Email can't be empty").notEmpty(),
  check("password","Password can't be shorter than 4 or longer than 20 symbols").isLength({min:4,max:20})
], controller.registration)
router.post("/login",controller.login)

module.exports = router;