const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/users");
}

const userSchema = new mongoose.Schema({
 firstName :{type:String, required:true},
 lastName :{type:String, required:false},
 email :{type:String, required:true, unique:false},
 password:{type:String, required:true}
});
const User = mongoose.model("student",userSchema);
const postSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        body:{type:String, required:true},
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"student",
            required:"true"
        }
    },
    {
    timestamps:true
}
);
const Post = mongoose.model("post",postSchema);

const commentSchema = new mongoose.Schema(
    {
    body:{type:String, required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true}
},
    {timestamps:true}

 
);
const Comment = mongoose.model("comment",commentSchema);

app.get("/users",async(req,res)=>{
 try{
     const users = await User.find().lean().exec();
     return res.send({users})
 }
 catch{
     return res.send("Something went wrong");
     
 }
})

app.listen(5000, async()=>{
     
    try{
        await connect();
    }
    catch{
        console.log("Something went wrong");
    }
    console.log("Listening on port 5000")
})