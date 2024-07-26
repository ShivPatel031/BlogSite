import { useEffect } from 'react';
import {Login as LoginComponent} from '../component/index.js';

function Login(){

    useEffect(()=>{
        console.log("login");
    })
    return (
        <div className='py-8'>
            <LoginComponent />
        </div>
    )
}

export {Login}