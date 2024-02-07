const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function(req,res,next) {
  let token;
  if(req.method === "OPTIONS") {
    next()
  }
  try {
    token = req.headers.authorization.split(" ")[1]
    if(!token) {
      res.status(400).json({message: "User is not authorized (token)"})
    }
    const decodedData = jwt.verify(token,SECRET)
    req.user = decodedData;
    next()
  } catch(e) {
    res.status(400).json({message: "User is not authorized (catch)"})
  }
}