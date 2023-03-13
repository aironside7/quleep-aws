const mongoose = require("mongoose")

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        required:false,
    },
    catagory:{
        type:Array,
        required:false,
    }
    
},{timestamps:true})

const Post= mongoose.model("Post",PostSchema)
module.exports= Post