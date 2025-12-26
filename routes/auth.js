import express from "express"
import { User } from "../models/userSchema.js"
import { errorMiddleware } from "../middlewares/errorhandler.js";
import { asyncHandler } from "../middlewares/asynchandler.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const auth = express.Router();

auth.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // basic input check
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const user = await User.findOne({ email });

  // same response for email OR password failure
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
  const JWT_secret = process.env.Secret_Key;
  const token = jwt.sign({userId : user._id},JWT_secret,{expiresIn: '1h'})
  
  return res.status(200).json({
    success: true,
    token
  });
}));


auth.post("/register",asyncHandler(async(req,res) => {
    const credentials = {
        email: req.body.email,
        password : req.body.password
    }
    await User.create(credentials);
    res.status(201).json({success : "true"});
}))

auth.use(errorMiddleware)
export {auth }