import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
//to parse foreing data below to used
app.use(express.json());//reg () runs btw req and resp
app.use(express.urlencoded({extended: true})); //to parse formm data
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('listening ');
    connectMongoDB();
});