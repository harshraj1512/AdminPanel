import React from 'react';
import Home from './home/Home';
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Employeetables from "./employees/Employeetables"
import AddEmployee from './components/AddEmployee';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';




function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log('AuthUser:', authUser);
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={authUser ? <Home />:<Navigate to="/signup"/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employeetable" element={authUser ? <Employeetables />:<Navigate to="/signup"/>} />
        <Route path="/addemployee" element={authUser ? <AddEmployee />:<Navigate to="/signup"/>} />
        
      </Routes>
      <Toaster />
      </div>
    </>
  )
}

export default App;