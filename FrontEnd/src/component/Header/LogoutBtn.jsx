import React from "react";
import { useDispatch } from "react-redux";
import {logout} from "../../store/authSlice.js";
import { useEffect } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials=true;

export function LogoutButton(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutWork =async()=>{

        const loggedoutUser=await axios("http://localhost:5000/api/v1/user/logout");

        if(loggedoutUser.data.success)
        {
            dispatch(logout());
            navigate('/');
        }
        
    }
    return(
        <>
            <button onClick={()=>logoutWork()} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-xl">Logout</button>     
        </>
    )
}
 