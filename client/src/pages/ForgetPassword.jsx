import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email,setEmail]=useState('');
    const [isVerfityOtp,setIsVerifyOtp]=useState(false);
    const [otp,setOtp]=useState("");
    const [isRestPassword,setIsResetPassword]=useState(false);
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleGetOtp=async(e)=>{
        e.preventDefault();
        if(! email){
            return toast.error("provide email");
        }

        try {
            const res=await axios.post('http://localhost:2000/api/v1/otp/create',{email});
            toast.success(res.data.message);
            setIsVerifyOtp(true);
        } catch (error) {
            return toast.error(error?.response?.data?.message);
        }
    }

    const handleSendOtp=async(e)=>{
        e.preventDefault();
        if(! otp){
            return toast.error("provide otp");
        }
        try {
            const res=await axios.post('http://localhost:2000/api/v1/otp/verify',{email,otp});
            toast.success(res.data.message);
            setIsResetPassword(true);
            setIsVerifyOtp(false);
        } catch (error) {
            
            return toast.error(error?.response?.data?.message);
        }
    }

    const handleChangePassword=async(e)=>{
        e.preventDefault();
        if(! password){
            return toast.error("provide password");
        }
        try {
            const res=await axios.post('http://localhost:2000/api/v1/otp/password',{password,email});
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            return toast.error(error?.response?.data?.message);
        }
    }
  return (
    <div>
      Forget Password


       {
        ! isVerfityOtp && ! isRestPassword  &&<form>
            <h1>email to genrate the otp</h1>
            <input type="text" value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
            <button type='submit' onClick={handleGetOtp}> get OTP</button>
        </form>
       }

       {
        isVerfityOtp && <form>
            <h1>enter the otp</h1>
            <input type="text" value={otp} placeholder='otp' onChange={(e)=>setOtp(e.target.value)} />
            <button type='submit' onClick={handleSendOtp}> send OTP</button>
        </form>
       }
       {
        isRestPassword &&  <form>
            <h1>now you can reset the password</h1>
            <input type="text" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit' onClick={handleChangePassword}> change password</button>
        </form>
       }
    </div>
  )
}

export default ForgetPassword
