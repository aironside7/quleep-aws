const mongoose = require("mongoose")

const CatSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    
},{timestamps:true})

const Cata= mongoose.model("cata",CatSchema)
module.exports= Cata