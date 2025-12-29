import React from 'react'
import {BrowserRouter,Routes,Route,Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {Toaster} from 'react-hot-toast'
import Signup from './pages/Signup'
import { useUser } from './contex/UserContex'
import Navbar from './pages/Navbar'
import Createnotes from './pages/Createnotes'
import Profile from './pages/Profile'
const App = () => {
  const {user}=useUser();
  return (
    <>
      <BrowserRouter>
        {user && <Navbar></Navbar>}
        <Routes>
          <Route path='/' element={<Check/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/createnotes' element={<Createnotes/>}/>
          <Route path='/profile' element={<Profile/>} />
        </Routes>
        <Toaster />
        
      </BrowserRouter>
    </>
  )
}


const Check=()=>{
  const isAuth=localStorage.getItem('token');
  if(! isAuth){
    return <Navigate to='/login' />
  }else{
    return <Navigate to='/dashboard' />
  }
}

export default App
