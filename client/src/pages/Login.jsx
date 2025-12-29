import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
 const Login = () => {
    const [loginDetails,setLoginDetails]=useState({email:"",password:""});
    const navigate=useNavigate()
    const handleChange=(e)=>{
        const {value,name}=e.target;
        setLoginDetails({...loginDetails , [name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(! loginDetails.email){
            return toast.error("email field is empty")
        }
        if(! loginDetails.password){
            return toast.error("password field is empty");
        }
        try {
            const data=await axios.post('http://localhost:2000/api/v1/user/login',loginDetails);
            localStorage.setItem('token',data.data.token);
            toast.success(data.data.message);
            return navigate('/dashboard');
        } catch (error) {
            return toast.error(error?.response?.data?.message);
        }
    }
  return (
    <div>
        LOGIN PAGE  

        <form >
            <input type="text" name="email" value={loginDetails.email} placeholder='email' onChange={handleChange}/>
            <input type="password" name="password" placeholder='password' onChange={handleChange} value={loginDetails.password} />
            <input type="submit" onClick={handleSubmit} value="Login" />
        </form>

        <div>don't have an account ? <Link to="/signup">singup</Link></div>
    </div>
  )
}

export default Login
