const mongoose= require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
url =(process.env.Murl)
mongoose.set("strictQuery", false);
mongoose.connect(url)
    // mongoose.set('strictQuery', true)

.then(()=>{
    console.log("connection with database succes")
}).catch((err)=>{
    console.log(err)
})