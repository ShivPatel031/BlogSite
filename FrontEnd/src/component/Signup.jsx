// import { useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import {login} from '../store/authSlice.js';
// import {Button,Input,SiteLogo} from './index.js';
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function Signup()
// {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {register, handleSubmit} = useForm();
//     const [error,setError] = useState("");

//     const create = async(userdata)=>{

//         setError("");
        
//         try {
//             const user = await axios.post("http://localhost:5000/api/v1/user/register",userdata);
//             console.log(user.data.data)
//             if(user?.data.success)
//             {
//                 const loginUser = await axios.post("http://localhost:5000/api/v1/user/login",userdata);
                
//                 if(loginUser.data.success){
//                     dispatch(login(user.data.data));
//                     navigate('/');
//                 } 
//             }
            
//         } catch (error) {
//             setError(error.message);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center">
//             <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
//                 <span className="inline-block w-full max-w-[100px]">
//                     <SiteLogo width="100%"/>
//                 </span>

//                 <h2 className="text-center text-2xl font-blod leading-tight">Sign up  to your account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have any account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline">Log in</Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)} encType={'multipart/form-data'}>
//                     <div className="space-y-5">
//                         <Input 
//                             label="Name:"
//                             type="text"
//                             placeholder="Enter your name"
//                             {...register("name",{required:true})}/>
//                         <Input 
//                             label="Email: "
//                             placeholder="Enter your email"
//                             type="email"
//                             {...register("email",{
//                                 required:true,
//                                 validate:{
//                                     matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
//                                 }
//                             })}/>
//                         <Input 
//                             label="Password: "
//                             type="password"
//                             placeholder="Enter your password"
//                             {...register("password",{required:true})}/>

//                         <Button type="submit" className='w-full active:scale-50' text={"Sign Up"} />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )

// }

// export {Signup};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from '../store/authSlice.js';
import { Button, Input, SiteLogo } from './index.js';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const create = async (userData) => {
    setError("");
    setIsLoading(true);
    try {
      const user = await axios.post("http://localhost:5000/api/v1/user/register", userData);
      if (user?.data.success) {
        const loginUser = await axios.post("http://localhost:5000/api/v1/user/login", userData);
        if (loginUser.data.success) {
          dispatch(login(user.data.data));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <SiteLogo width="120" className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              Log in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(create)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
            </div>
          </div>

          {(errors.name || errors.email || errors.password || error) && (
            <div className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="mr-2" size={16} />
              <span>{errors.name?.message || errors.email?.message || errors.password?.message || error}</span>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              // disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Signup };