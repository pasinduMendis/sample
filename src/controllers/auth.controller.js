const bcrypt = require("bcryptjs");
const User=require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const jwt = require('jsonwebtoken')


exports.signUp = async (req, res) => {
    const { name, email, password } =req.body
  try {
    const findIsExistUser=await User.findOne({email:email}).catch((err) => {
        res
        .status(500)
        .send({ message: "An unexpected error occured!", error: err });
        return;
      });
    if (findIsExistUser) {
      res.status(403).send({ message: "already exist user!" });
    } else {
      var user = {
        name:name,
        email:email,
        password:password,
        userId:uuidv4()
      };
      
      user.password = bcrypt.hashSync(user.password, 8);

      const userObj=new User(user)
      userObj
      .save()
      .then((result) => {
        res
      .status(200)
      .send({ message: "successfully registered!" });
        return;
      })
      .catch((err) => {
        console.log(err);
        res
      .status(500)
      .send({ message: "An unexpected error occured!", error: err });
        return;
      });
     
    }
  } catch (error) {
    console.log("Debugger error", error);
    res
      .status(500)
      .send({ message: "An unexpected error occured!", error: error });
      return;
  }
};

exports.signIn = async (req, res) => {
    const { email, password } =req.body
  try {
    const findIsExistUser=await User.findOne({email:email}).catch((err) => {
        res
        .status(500)
        .send({ message: "An unexpected error occured!", error: err });
        return;
      });
    if (!findIsExistUser) {
      res.status(403).send({ message: "invalid email!" });
      return;
    } else {
       
        const validPassword = bcrypt.compareSync(password, findIsExistUser.password);
        if(!validPassword){
            res.status(403).send({ message: "invalid password!" });
            return;
        }

        var user=findIsExistUser
        const token = jwt.sign({ id: findIsExistUser.userId }, process.env.JWT_SECRET, {});
        res
        .status(200)
        .send({ message: "successfully login!",userData:{name:user.name,email:user.email,userId:user.userId,accessToken:token} });
          return;
     
    }
  } catch (error) {
    console.log("Debugger -- sign in -- error", error);
    res
      .status(500)
      .send({ message: "An unexpected error occured!", error: error });
      return;
  }
};