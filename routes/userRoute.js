const express=require("express")
const { userdata, getuserdata } = require("../controllers/userController")
const userRouter=express.Router()

userRouter.post("/userdata",userdata)
userRouter.get("/getuserdata",getuserdata)
module.exports=userRouter