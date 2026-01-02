import React, { useState,useEffect } from 'react'
import { useUser } from '../contex/UserContex';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../utils/getUserDetailds';
import toast from 'react-hot-toast';
import axios from 'axios';

const Createnotes = () => {
  const [inp,setInp]=useState("");
  const {setUser}=useUser();
  const navigate=useNavigate();
    useEffect(()=>{ 
      getUserDetails(setUser);
      const token=localStorage.getItem('token');
      if(!token) {
        return navigate('/login');
      } 
    },[]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!inp){
      return toast.error("note cannot be empty");
    }
    try {
      const token=localStorage.getItem('token');
      const data=await axios.post('http://localhost:2000/api/v1/note/create',{note:inp},{
                  headers: {
                  Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json",
          },
        });
         toast.success(data.data.message);
         setInp("");
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div>
      <h1>Createnotes</h1>

      <form >
        <textarea value={inp} onChange={(e)=>setInp(e.target.value)}>

        </textarea>

        <button onClick={handleSubmit}>submit</button>
      </form>
    </div>
  )
}

export default Createnotes
