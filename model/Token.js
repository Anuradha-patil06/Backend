const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId(ObjectId),
            required:true,ref:"user"
        },
        tokenId:{
            typer:String,required:true
        }
    },{timestamps:true})

    const TokenModel=mongoose.model("Token",tokenSchema)

    module.exports=TokenModel
