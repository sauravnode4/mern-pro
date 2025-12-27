const express=require('express');
const connetDb = require('./db/dbConnect');
const userRouter = require('./route/userRouter');
const cors=require('cors');
const app=express();

app.use(cors())
//json middleware
app.use(express.json());
//db connection
connetDb();


app.use('/api/v1/user',userRouter);

app.listen(2000,()=>{
    console.log("server is running");
});