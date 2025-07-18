const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        required:true,ref:"user"
    },
    productId:{type:mongoose.Schema.Types.ObjectId,
        required:true,ref:"product"
    },
    rating:{type:Number,min:1,max:5,required:true},
    review:{type:String}
},{
    timestamps:true
})

const RatingModel=mongoose.model("Rating",ratingSchema)

module.exports=RatingModel