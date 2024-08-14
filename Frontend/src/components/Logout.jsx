import React from 'react'

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Logout() {
    const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout Successfully");
      navigate("/")
    } catch (error) {
      toast.error("Error :" + error.message);
      setTimeout(()=> {}, 3000);
    }
  };

  return (
    <div>
      <button className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout