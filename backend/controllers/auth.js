import User from "../models/user.js";
import bcrypt from "bcryptjs"

import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
export const signup = async (req, res, next) => {
 try {
   const { fullName, email, password, username} = req.body;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}
      const userName = await User.findOne({username});
      if(userName)
         {
            return res.status(400).json({error: "Username already exists"});
         }
         const userEmail = await User.findOne({email});
         if(userEmail)
            {
               return res.status(400).json({error: "Email already exists"});
            }
            if(password.length < 5)
               {
                  return res.status(400).json({error: "Password must be at least 5 characters"});
               }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
               fullName,
               username,
               email,
               password: hashedPassword,
            });
            if (newUser) {
               generateTokenAndSetCookie(newUser._id, res);
               await newUser.save();
      //The generateTokenAndSetCookie function 
      //likely generates an authentication token 
      //(such as a JWT) for the user and sets it as a 
      //cookie in the HTTP response, which is then 
      //sent back to the client's browser. 
      //This process helps with user authentication 
      //and maintaining session state.
               res.status(201).json({
                  _id: newUser._id,
                  fullName: newUser.fullName,
                  username: newUser.username,
                  email: newUser.email,
                  followers: newUser.followers,
                  following: newUser.following,
                  profileImg: newUser.profileImg,
                  coverImg: newUser.coverImg,
               });
            } else {
               res.status(400).json({ error: "Invalid user data" });
            }
         } catch (error) {
            console.log("Error in signup ", error.message);
            res.status(500).json({ error: "Internal Server Error" });
         }
      }
export const login = async (req, res, next) => {
    try {
      const {  username, password,} = req.body;
   
      const user = await User.findOne({username});
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
      if(!user || !isPasswordCorrect) 
         {
            return res.status(400).json({error: "Invalid username or password"});
         }
         generateTokenAndSetCookie(user._id,res);
         res.status(201).json({
            _id:user._id,
            fullName: user.fullName,
            username:user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
         });
      
       
    } catch (error) {
      console.log("Error in login ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
 }
 export const logout = async (req, res, next) => {
   try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({message: "Logged out Successfully"});
   } catch (error) {
      console.log("Error in logout ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
 };

 export const getMe= async (req, res, next) => {
   try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json(user);
   } catch (error) {
      console.log("Error in getMe", error.message);
      res.status(500).json({ error: "Internal Server Error" });
   }
 };