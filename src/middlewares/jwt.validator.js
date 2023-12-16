const jwt = require('jsonwebtoken')
require("dotenv").config();
const User=require("../models/user.model");

const verifyToken =async (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    res.status(403).send({ message: 'Missing access token!' })
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    console.log("error : ", err,"Decoded : ", decoded)
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' })
    }
    const findIsExistUser=await User.findOne({userId:decoded.id}).catch((err) => {
      return res
      .status(500)
      .send({ message: "An unexpected error occured!", error: error });
      
    });
  if (!findIsExistUser) {
    return res.status(403).send({ message: "invalid access token!" });
  }

    req.userId = decoded.id;
    next()
  })
}

const jwtValidator = {
  verifyToken,
}

module.exports = jwtValidator
