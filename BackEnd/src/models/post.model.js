import mongoose,{Schema} from "mongoose";

const postSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        content:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
        },
        title:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
        }
    },
    {
        timestamps:true
    }
)

export const Post = mongoose.model("Post",postSchema)