import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import { addPost } from './store/postSlice'
import { Footer, Header } from './component'
import { Outlet,useNavigate } from 'react-router-dom'
import axios from 'axios';
axios.defaults.withCredentials=true;

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadPosts = async ()=>{
    const postData = await axios("http://localhost:5000/api/v1/posts/get-posts");

    if(postData.data.success)
    {
      dispatch(addPost(postData.data.data));
    }
  }


  const authenticateUSer =async()=>{
    const logeduser = await axios.post("http://localhost:5000/api/v1/user/authUser");

    if(logeduser.data.success)
    {
      if(logeduser.data.success){
        dispatch(login(logeduser.data.data));
        navigate('/');
      }
    }
    
  }

  useEffect(() => {
      loadPosts();
      authenticateUSer();
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      
        <Header />
        <main>
        TODO: <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

