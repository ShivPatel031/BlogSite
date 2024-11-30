
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials=true;

function PostCard({ _id, title, coverImage, excerpt, author, likes }) {
    const user = useSelector(state=>state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(likes)
//   const isLiked = useSelector(state => state.likes[_id] || false);

    // const [like, setLike] = useState([]);
    const isLiked = likes.some(data=>data===user?._id);
    console.log(isLiked);

    const getLikes =async()=>{
      const response = await axios.post("http://localhost:5000/api/v1/posts/get-likes",{postId:_id});
      // setLike(response.data.data);
    }

    const dislike = async(id)=>{
      try {
        const response = await axios.post(`http://localhost:5000/api/v1/posts/dislike`,{userId:user._id,postId:_id});
        if (response.status == 200) getLikes();
      } catch (error) {
        console.log(error);
      }
      
    }

  const handleLike = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    if(!user)
    {
      navigate("/login");
      return;
    }

    if(!isLiked)
    {
      try {
          const response = await axios.post("http://localhost:5000/api/v1/posts/like-post",{userId:user._id,postId:_id});
          if(response) getLikes();
      } catch (error) {
          console.log(error);
      }
    }
    else{
      dislike();
    }

    
    
    
  };

  // useEffect(()=>{getLikes()},[]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      <Link to={`/post/${_id}`} className="block">
        <img className="w-full h-48 object-cover" src={coverImage} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
          {/* <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
          <p className="text-gray-500 text-xs">By {author}</p> */}
        </div>
      </Link>
      <div className="px-6 pt-2 pb-4 flex items-center justify-between">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors duration-300`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes.length}</span>
        </button>
        <Link 
          to={`/post/${_id}`} 
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export { PostCard };