import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contex/UserContex'
import toast from 'react-hot-toast'

const Navbar = () => {
    const {setUser}=useUser();
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        setUser(null);
        toast.success('u r logged out');
        navigate('/login');
    }
  return (
    <div>
        <Link to='/dashboard'>dashboard</Link> <br/>
        <Link to="/createnotes">createnotes</Link> <br/>
        <Link to='/profile'>PROFILE</Link> <br/>
        <button onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default Navbar
