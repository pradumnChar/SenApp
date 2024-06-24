import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import connectMongoDB from "./db/connectMongoDB.js";
import postRoutes from "./routes/post.js";
import cookieParser from "cookie-parser";
import  path from "path";
dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname= path.resolve()

//to parse foreing data below to used

app.use(express.json({limit:'5mb'})); //reg () runs btw req and resp
app.use(express.urlencoded({ extended: true })); //to parse formm data
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
if(process.env.NODE_ENV === 'production')
	{
		app.use(express.static(path.join(__dirname,"/frontend/dist")));
		app.get("*", (req, res) =>{
			res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
		})
	}

app.listen(PORT, () => {
  console.log("listening ");
  connectMongoDB();
});
