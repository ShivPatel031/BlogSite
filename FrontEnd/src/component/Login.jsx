// import { useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import {login} from '../store/authSlice.js';
// import {Button,Input,SiteLogo} from './index.js';
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// axios.defaults.withCredentials=true;

// function Login(){
//     const nevigate = useNavigate();
//     const dispatch = useDispatch();
//     const {register, handleSubmit} = useForm();
//     const [error,setError] = useState("");

//     function refreshPage() {
//         setTimeout(()=>{
//             window.location.reload();
//         }, 500);
//         console.log('page to reload')
//     }


//     const loginUser=async(userdata)=>{
//         setError("");
//         try {
//             const logeduser = await axios.post("http://localhost:5000/api/v1/user/login",userdata);
                
//                 if(logeduser.data.success){
//                     dispatch(login(logeduser.data.data));
//                     refreshPage();
//                     nevigate('/');
//                 } 
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//     return (
//         <div className="flex items-center justify-center w-full">
//             <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <SiteLogo width="100%"/>
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-blod leading-tight">Sign in  to your account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline">Sign up</Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form 
//                     onSubmit={handleSubmit(loginUser)}
//                     className="mt-8">
//                     <div className="space-y-5">
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

//                         <Button type="submit" className='w-full' text={"Sign in"} />
//                     </div>

//                 </form>
//             </div>
//         </div>
//     )
// }

// export {Login};
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { login } from '../store/authSlice.js';
// import { Button, Input, SiteLogo } from './index.js';
// import { Mail, Lock, AlertCircle } from 'lucide-react';

// axios.defaults.withCredentials = true;

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const refreshPage = () => {
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

//   const loginUser = async (userData) => {
//     setError("");
//     setIsLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/v1/user/login", userData);
//       if (response.data.success) {
//         dispatch(login(response.data.data));
//         refreshPage();
//         navigate('/');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <div className="flex justify-center">
//             <SiteLogo width="100" className="h-12 w-auto" />
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//               create a new account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginUser)}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <Input
//                 id="email-address"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Invalid email address"
//                   }
//                 })}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <Input
//                 id="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 {...register("password", { required: "Password is required" })}
//               />
//             </div>
//           </div>

//           {(errors.email || errors.password || error) && (
//             <div className="text-red-500 text-sm mt-2">
//               <AlertCircle className="inline mr-1" size={16} />
//               {errors.email?.message || errors.password?.message || error}
//             </div>
//           )}

//           <div>
//             <Button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 </span>
//               ) : (
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <Lock className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
//                 </span>
//               )}
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export { Login };

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from '../store/authSlice.js';
import { Button, Input, SiteLogo } from './index.js';
import { Mail, Lock, AlertCircle } from 'lucide-react';

axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const loginUser = async (userData) => {
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(`http://${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/login`, userData);
      if (response.data.success) {
        dispatch(login(response.data.data));
        refreshPage();
        navigate('/');
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
        <div className="text-center flex flex-col justify-center items-center">
          <SiteLogo width="120" className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              Sign up here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginUser)}>
          <div className="space-y-6">
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
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
            </div>
          </div>

          {(errors.email || errors.password || error) && (
            <div className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="mr-2" size={16} />
              <span>{errors.email?.message || errors.password?.message || error}</span>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Lock className="absolute left-0 inset-y-0 flex items-center pl-3 h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              )}
              {isLoading ? 'logging in...' : 'Log in'}
            </Button>
          </div>
        </form>
        {/* <div className="text-center">
          <Link to="/forgot-password" className="font-medium text-sm text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
            Forgot your password?
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export { Login };