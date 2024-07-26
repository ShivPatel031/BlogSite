import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new Schema(
    {
        userName:{
            required:true,
            type:String,
            unique:true,
            lowercase:true,
            index:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:
        {
            type:String,
        },
        post:[
            {
                type:Schema.Types.ObjectId,
                ref:"Post"

            }
        ],
        useImage:{
            type:String,
        }
    },
    {timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken = async function()
{
    return jwt.sign({
        _id:this.id,
        email:this.email,
        userName:this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = async function()
{
    return jwt.sign({
        _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema);