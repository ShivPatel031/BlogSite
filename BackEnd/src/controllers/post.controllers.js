import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { Like } from "../models/like.model.js";

const getPosts = asynchandler(async (req,res)=>{
    const posts = await Post.find().limit(10);

    if(!posts) throw new ApiError(500,"No posts is found");

    console.log("Sending Post data");

    res.status(201).json(new ApiResponse(201,posts,"post loaded successfully"));
});


const getSinglePost =  asynchandler(async (req,res)=>{
    const post = await Post.findById(req.params.Id);

    if(!post) throw new ApiError(400,"post not found");

    console.log("sending a single post");

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

        console.log("Updating Post with id ",Id);

        res.status(200).json(new ApiResponse(200,post,"post updated successfully"));
    }
)

const deletePost = asynchandler(async (req,res)=>{
    const post = await Post.findByIdAndDelete(req.params.Id);

    if(!post) throw new ApiError(500,"somting went wrong while deleting post ");

    console.log("Deleting Post with id ",req.params.Id);

    res.status(200).json(new ApiResponse(200,post,"Post is deleted successfully"));
})

const likedPost = asynchandler(async (req,res)=>{

    try {
        const {userId,postId} = await req.body;

        if(!userId || !postId) throw new ApiError(404,"Didn't get userId or postId");

        const post = await Post.findById(postId);

        if(!post) console.log("Post is not found");

        post.likes.push(userId);

        await post.save();

        if(post) console.log("post with id "+postId+"is liked successfully");

        res.status(200).json(new ApiResponse(200,post,"Post is liked successfuly"));
    } catch (error) {
        console.log(error)   
    }
})

const getLikes = asynchandler(async (req,res)=>
    {
        const {postId} = req.body;
        
        if(!postId) throw new ApiError(404,"Didn't get post id");

        const likedpost = await Like.find({post:postId}).select("-post -createdAt -updatedAt");

        res.status(200).json(new ApiResponse(200,likedpost,"Post is liked successfuly"));
    }
)

const disLikePost = asynchandler(async (req,res)=>
    {
        try {
            const {userId,postId} = await req.body;

            if(!userId || !postId) throw new ApiError(404,"Didn't get userId or postId");

            // const dislike = await Like.findOneAndDelete(id);

            const post = await Post.findById(postId);

            if(!post) console.log("Post is not found");

            post.likes.pull(userId);

            const dislike = await post.save();

            if(dislike) console.log("Post disliked successfully");

            res.status(200).json(new ApiResponse(200,dislike,"Post is disliked successfuly"));
            
        } catch (error) {
            console.log(error);
        }
    }
)


export {getPosts,getSinglePost,updatePost,deletePost,likedPost,getLikes,disLikePost};