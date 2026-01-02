import axios from "axios";
import { useUser } from "../contex/UserContex";
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


export async function getUserDetails(setUser) {
      const token=localStorage.getItem('token');
     
      try {
        const res=await axios.get('http://localhost:2000/api/v1/user/', {
                  headers: {
                  Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
          localStorage.removeItem('token');
          toast.error(error?.response?.data?.message);
          
      }
    }