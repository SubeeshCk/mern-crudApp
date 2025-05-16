import express from 'express'
import mongoose  from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected MongoDB')
})
.catch((err)=> {
    console.error(err);
})



app.listen(3000,()=>{
    console.log('server listening on port 3000')
});

app.use('/api/user', userRoutes)
app.use('/api/auth',authRoutes)