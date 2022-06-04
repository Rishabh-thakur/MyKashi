import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


app.use('/posts',postRoutes);
app.use('/user' ,userRoutes);

app.get('/',(req,res)=>{
    res.send('APP IS RUNNING. ');
})


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> app.listen(PORT,()=> console.log(`server running on port:${PORT}`))).catch((error)=> console.log(`The error is ${error.message}`));

