const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../Models/User")
const Postd = require("../Models/Post")
const Cata = require("../Models/Catagoty")
const router = express()

router.post("/regis",async (req,res)=>{
       try{
        const salt = await bcrypt.genSalt(10)
        const hshpass= await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hshpass
        })
        const user = await newUser.save()
        res.status(200).json(user)
       }
       catch(err){
          res.status(500).send(err)
       }
})

router.post("/sinup", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("wrong credential") 
        const valpas = await bcrypt.compare(req.body.password, user.password)
        !valpas && res.status(400).json("wrong credential") 
        const {password,...others} = user._doc
        res.status(200).json(others)

    }
    catch{

    }
})

module.exports = router