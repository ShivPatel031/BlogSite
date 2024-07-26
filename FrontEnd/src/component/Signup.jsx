import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {login} from '../store/authSlice.js';
import {Button,Input,SiteLogo} from './index.js';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error,setError] = useState("");

    const create = async(userdata)=>{

        setError("");
        
        try {
            const user = await axios.post("http://localhost:5000/api/v1/user/register",userdata);
            console.log(user.data.data)
            if(user?.data.success)
            {
                const loginUser = await axios.post("http://localhost:5000/api/v1/user/login",userdata);
                
                if(loginUser.data.success){
                    dispatch(login(user.data.data));
                    navigate('/');
                } 
            }
            
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <span className="inline-block w-full max-w-[100px]">
                    <SiteLogo width="100%"/>
                </span>

                <h2 className="text-center text-2xl font-blod leading-tight">Sign up  to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline">Log in</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} encType={'multipart/form-data'}>
                    <div className="space-y-5">
                        <Input 
                            label="Name:"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name",{required:true})}/>
                        <Input 
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                                }
                            })}/>
                        <Input 
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password",{required:true})}/>

                        <Button type="submit" className='w-full active:scale-50' text={"Sign Up"} />
                    </div>
                </form>
            </div>
        </div>
    )

}

export {Signup};