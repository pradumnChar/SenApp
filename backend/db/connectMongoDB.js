import mongoose from 'mongoose';

const connectMongoDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongo');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectMongoDB;