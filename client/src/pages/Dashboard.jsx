import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useUser } from '../contex/UserContex';
import { getUserDetails } from '../utils/getUserDetailds';
import { useNavigate } from 'react-router-dom';

   async function getNotes(setNotes) {
      try {
        const token=localStorage.getItem('token');
        const res=await axios.get('http://localhost:2000/api/v1/note',{
                  headers: {
                  Authorization: `Bearer ${token}`,
          },
        });
        toast.success(res.data.status);
        console.log(res.data.notes);
        setNotes(res.data.notes);
      } catch (error) {
        return toast.error(error?.response?.data?.message);
      }
    }

const Dashboard = () =>{
   const {setUser,user }=useUser();
   const [notes,setNotes]=useState(null);
   const navigate=useNavigate()
  useEffect(()=>{ 
    getUserDetails(setUser);
    const token=localStorage.getItem('token');
    if(!token) {
      return navigate('/login');
    } 
  },[]);
  useEffect(()=>{
  
    getNotes(setNotes);
  },[]);


  const handleDeleteNote=async(_id)=>{
    try {
      const token=localStorage.getItem('token');
      const res=await axios.delete(`http://localhost:2000/api/v1/note/delete/${_id}`,{
                  headers: {
                  Authorization: `Bearer ${token}`,
          },
        });

      toast.success(res.data.message);
      getNotes(setNotes);
    } catch (error) {
      console.log(error);
      return toast.error(error?.response?.data?.message);
    }
  }
  return (
    <div>
        Dashboard


        {
          notes?.map((n,i)=>(
            <div key={i}>{n.note}  <button onClick={()=>handleDeleteNote(n._id)}>del</button></div>
          ))
        }
    </div>
  )
}

export default Dashboard
