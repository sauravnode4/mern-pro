import React, { useEffect, useState } from 'react'
import { useUser } from '../contex/UserContex'
import { getUserDetails } from '../utils/getUserDetailds';
import {toast} from 'react-hot-toast'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Profile = () => {
  const {user,setUser}=useUser();
  const [isUpdate,setIsUpdate]=useState(false);
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    getUserDetails(setUser);
    const token=localStorage.getItem('token');
    if(!token) {
      return navigate('/login');
    }
  },[]);

  const handleUpdateName=async(e)=>{
    e.preventDefault();
    if(! name){
      return toast.error("input field cannot be empty");
    }
    if(name == user.name){
      return toast.error("current name & updated name cannot be same");
    }
    const token=localStorage.getItem('token');
   
    try {
        const res=await axios.patch('http://localhost:2000/api/v1/user/name',{
            name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        toast.success(res.data.message);
          getUserDetails(setUser);
          setIsUpdate(false);
          setName("");
    } catch (error) {
        console.log(error);
       return toast.error(error?.response?.data?.message);
    }
  }

  const handleUpdatePass=async(e)=>{
    e.preventDefault();
    if(!password || ! newPassword){
      return toast.error("input fileds are empty");
    }
    const token=localStorage.getItem('token');
   
    try {
        const res=await axios.patch('http://localhost:2000/api/v1/user/password',{
            password,newPassword
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        toast.success(res.data.message);
          setIsUpdate(false);
          setPassword("");
          setNewPassword("");
          localStorage.removeItem('token');
          navigate('/login');
          setUser(null);
    } catch (error) {
        console.log(error);
       return toast.error(error?.response?.data?.message);
    }

  }
  return (
    <div>
      Profile

      <h1> name = {user?.name}  <button onClick={()=>setIsUpdate(isUpdate ? false : "name")}>updatename</button></h1>

      <h3>email = {user?.email}</h3>

      <button onClick={()=>setIsUpdate(isUpdate ? false : "password")}>update password</button>
      {isUpdate == 'name' && <form>
          <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="submit" value="update" onClick={handleUpdateName} />
        </form>}

        {
          isUpdate == 'password' && <form>
          <input type="text" placeholder='current password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <input type="text" placeholder='new  password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />

          <input type="submit" onClick={handleUpdatePass} />
        </form>
        }
    </div>
  )
}

export default Profile
