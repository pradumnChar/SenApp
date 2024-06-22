import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import connectMongoDB from './db/connectMongoDB.js';
dotenv.config();
const app = express();

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('listening ');
    connectMongoDB();
});