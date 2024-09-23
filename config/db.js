const mongoose=require("mongoose")
const connectDb=async(req,res)=>{
    await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Connected to database")).catch((err)=>{
        console.log(err)
    });
}
module.exports={connectDb}
