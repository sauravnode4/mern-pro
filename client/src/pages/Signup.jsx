import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate();
    const [singupDetails,setSignupDetails]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        const {value,name}=e.target;
        setSignupDetails({...singupDetails , [name]:value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=singupDetails;

        if(!name){
            return toast.error("name field is mandatory");
        }
        if(! email){
            return toast.error("email field is mandatory");
        }
         if(! password){
            return toast.error("password field is mandatory");
        }
        try {
            const res=await axios.post('http://localhost:2000/api/v1/user/signup',singupDetails);
            toast.success(res.data.message);
            return navigate('/login');
        } catch (error) {
            return toast.error(error?.response?.data?.message);
        }
    }
  return (   
    <div>
        <h1>signup page</h1>
         <form >
            <input type="text" name="name" value={singupDetails.name} placeholder='enter name' onChange={handleChange}/>
            <input type="text" name="email" value={singupDetails.email} placeholder='email' onChange={handleChange}/>
            <input type="password" name="password" placeholder='password' onChange={handleChange} value={singupDetails.password} />
            <input type="submit" onClick={handleSubmit} value="Signup" />
        </form>

        <div>already have an account ? <Link to="/login">login</Link></div>
    </div>
  )
}

export default Signup
