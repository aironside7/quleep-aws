const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../Models/User")
const Postd = require("../Models/Post")
const Cata = require("../Models/Catagoty")
const { findById } = require("../Models/User")
const router = express()

router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updateUser)
        }
        catch(err){
           res.status(500).send(err)
        }
    }
    else{
        res.status(500).json("you cant update others data")
    }
})

router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
              const user = await User.findById(req.params.id)
            try{
                await Postd.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("deleted")
                }
                catch(err){
                   res.status(500).send(err)
                }

        }catch(err){
            res.status(500).send(err)
         }
    }
    else{
        res.status(500).json("you cant delete others data")
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others}= user._doc
        res.status(200).send(others)
    }catch(err){
        res.status(500).send(err)
     }
})

module.exports = router