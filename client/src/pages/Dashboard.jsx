import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useUser } from '../contex/UserContex';

const Dashboard = () =>{
  const {setUser}=useUser()
  useEffect(()=>{
    async function getUserDetails() {
      const token=localStorage.getItem('token');
      try {
        const res=await axios.get('http://localhost:2000/api/v1/user/', {
                  headers: {
                  Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
         return toast.error(error?.response?.data?.message);
      }
    }
    getUserDetails()
  },[])
  return (
    <div>
        Dashboard
    </div>
  )
}

export default Dashboard
