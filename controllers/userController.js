const { User } = require("../models/userModel");
const express=require("express")
const app=express()

const userdata = async (req, res) => {
  try {
    const { name, link, image } = req.body;
    const existingUserhandle = await User.findOne({ handle: link });
    const existingUsername = await User.findOne({ name });
    if (existingUsername) {
      return res.json({
        message: "The given user name exists",
        success: false,
      });
    }
    if (existingUserhandle) {
      return res.json({
        message: "The given user handle exists",
        success: false,
      });
    }

    const user = {
      name,
      handle: link,
      images: image,
    };

    const addData = new User(user);
    await addData.save();
    const io = req.app.get('socketio'); // Get Socket.IO instance
    io.emit('newUser', addData);
    res.json({ message: "User details added", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Some error occured", success: false });
  }
};
const getuserdata=async(req,res)=>{
  try{
    const userdata=await User.find({});
    res.json({userdata:userdata,success:true})
  }
  catch(err)
  {
    res.json({message:"Error occured in fetching data",success:false})
    
  }

}
module.exports = { userdata,getuserdata };
