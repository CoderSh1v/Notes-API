import { app } from './app.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB CONNECTED');
}).catch((e) => {
    console.log('DB CONNECTION ERROR');
})




app.listen(3000,() => {
    console.log('Server Started')
})
