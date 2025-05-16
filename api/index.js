import express from 'express'
import mongoose  from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected MongoDB')
})
.catch((err)=> {
    console.error(err);
})

const app = express();

app.listen(3000,()=>{
    console.log('server listening on port 3000')
});