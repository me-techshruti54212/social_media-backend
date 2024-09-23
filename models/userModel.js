const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        handle:{type:String,required:true,unique:true},
        images:{type:[String],required:false}

    },{
        timestamps:true
    }
)

const User=mongoose.model("user",userSchema)
module.exports={User}