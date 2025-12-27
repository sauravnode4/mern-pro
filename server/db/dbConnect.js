const mongoose=require('mongoose');

const connetDb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/PROJECT');
        console.log("db connected successfully")
    } catch (error) {
        
        console.log("db NOT connected")
    }
}

module.exports=connetDb;