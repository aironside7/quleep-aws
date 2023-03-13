
const mongoose= require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://ani:ani@cluster0.0shejil.mongodb.net/quleep?retryWrites=true&w=majority")
    // mongoose.set('strictQuery', true)

.then(()=>{
    console.log("connection with database succes")
}).catch((err)=>{
    console.log(err)
})