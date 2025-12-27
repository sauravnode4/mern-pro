import React from 'react'
import {BrowserRouter,Routes,Route,Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Check/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
        <Toaster />
        
      </BrowserRouter>
    </>
  )
}


const Check=()=>{
  const navigate=useNavigate()
  const isAuth=localStorage.getItem('token');
  if(! isAuth){
    return navigate('/login');
  }else{
    return navigate('/dashboard')
  }
}

export default App
