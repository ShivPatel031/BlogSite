import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";

const getPosts = asynchandler(async (req,res)=>{
    const posts = await Post.find().limit(10);

    if(!posts) throw new ApiError(500,"No posts is found");

    res.status(201).json(new ApiResponse(201,posts,"post loaded successfully"));
});


const getSinglePost =  asynchandler(async (req,res)=>{
    const post = await Post.findById(req.params.Id);

    if(!post) throw new ApiError(400,"post not found");

    res.status(201).json(new ApiResponse(201,post,"post found"));
});

const updatePost=asynchandler(async (req,res)=>
    {
        const {title,slug,content,status,Id} = req.body;

        if(!title || !slug || !content || !status || !Id) throw new ApiError(401,"required all details");

        const post  =  await Post.findById(Id);

        if(!post) throw new ApiError(401,"post not found");

        post.title=title;
        post.slug=slug;
        post.status=status=='active'?true:false;
        post.content=content;

        await post.save({validateBeforSave:false});

        res.status(200).json(new ApiResponse(200,post,"post updated successfully"));
    }
)

const deletePost = asynchandler(async (req,res)=>{
    const post = await Post.findByIdAndDelete(req.params.Id);

    if(!post) throw new ApiError(500,"somting went wrong while deleting post ");

    res.status(200).json(new ApiResponse(200,post,"Post is deleted successfully"));
})

export {getPosts,getSinglePost,updatePost,deletePost};