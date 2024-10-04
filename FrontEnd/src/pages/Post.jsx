// import { useEffect,useState } from "react";
// import { Link,useNavigate,useParams } from "react-router-dom";
// import {Button,Container} from "../component/index.js";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";
// import axios from "axios";
// axios.defaults.withCredentials=true;

// function Post(){
//     const [post,setPost] = useState(null);
//     const {slug} = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state)=>state.auth.userData);
//     function refreshPage() {
//         setTimeout(()=>{
//             window.location.reload();
//         }, 500);
//         console.log('page to reload')
//     }

//     const isAuthor = post && userData ? post.user===userData._id : false;

//     const getSelectedPost = async(slug)=>
//     {
//         const response = await axios(`http://localhost:5000/api/v1/posts/single-post/${slug}`)

//         if(response.data.success)
//         {
//             setPost(response.data.data);
//         }
//     }

//     useEffect(()=>
//     {
//         if(slug)
//         {
//             getSelectedPost(slug);
//         }
//         else{
//             navigate("/")
//         }
//     },[slug,navigate])


//     const deletePost =async()=>{

//         const response = await axios(`http://localhost:5000/api/v1/posts/delete-post/${post._id}`);

//         console.log(response);

//         if(response.data.success)
//         {
//             refreshPage();
//             navigate('/');
//         }
        
//     }

//     return post ? (<div className='py-8'>
//         <Container>
//             <div className='w-[450px] h-[600px] flex justify-center mb-4 relative border rounded-xl pt-2'>
//                 <img src={post.coverImage} alt="cover image" className="rounded-xl" />

//                 {isAuthor && (<div className="absolute right-6 top-6">
//                     <Link to={`/edit-post/${post._id}`}>
//                         <Button bgColor='bg-green-200' className='mr-3' text="Edit"></Button>
//                     </Link>
//                     <Button bgColor="bg-red-500" onClick={deletePost} text="Delete"></Button>
//                 </div>)}
//             </div>
//             <div className="w-full mb-6">
//                 <h1 className="text-2xl font-bold">{post.title}</h1>
//             </div>
//             <div className="browser-css">
//                     {parse(post.content)}
//             </div>
//         </Container>
//     </div>):<h1>not post</h1>
// }
// export  {Post}
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";
import { Button, Container } from "../component/index.js";
import { Edit2, Trash2, Clock, User } from 'lucide-react';

axios.defaults.withCredentials = true;

function Post() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const isAuthor = post && userData ? post.user === userData._id : false;

  const getSelectedPost = async (slug) => {
    try {
      setIsLoading(true);
      const response = await axios(`http://localhost:5000/api/v1/posts/single-post/${slug}`);
      if (response.data.success) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getSelectedPost(slug);
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios(`http://localhost:5000/api/v1/posts/delete-post/${post._id}`);
        if (response.data.success) {
          refreshPage();
          navigate('/');
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-[400px] object-cover"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 space-x-2">
                <Link to={`/edit-post/${post._id}`}>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
                  >
                    <Edit2 size={18} className="mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button 
                  onClick={deletePost}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <User size={18} className="mr-2" />
              <span className="mr-4">{post.author}</span>
              <Clock size={18} className="mr-2" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}

export { Post };