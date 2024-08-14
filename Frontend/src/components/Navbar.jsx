import React, { useEffect, useState } from 'react'
import Logout from './Logout';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth();
    console.log(authUser);
    const [Name, setName] = useState("");

    useEffect(() => {
        // Fetch the user's name from localStorage
        const storedUser = JSON.parse(localStorage.getItem("Users"));
        if (storedUser && storedUser.fullname) {
            setName(storedUser.fullname);
        } else {
            setName("Guest");
        }
    }, []);

    useEffect(() => {
        // Redirect to login page if authUser is not present
        if (!authUser) {
            navigate('/'); // Adjust the path if needed
        }
    }, [authUser, navigate]);

    const navItems = (<>
        <li>
            <a href="/home">Home</a>
        </li>
        <li>
            <a href="/employeetable">Employee list</a>
        </li>
    </>)
    return (
        <>
            <div className=" max-w-screen-2xl container mx-auto md:px-10">
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">{navItems}</ul>
                        </div>
                        <a className="md:text-2xl font-bold cursor-pointer text-lg">Admin Panel</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">{navItems}</ul>
                    </div>
                    <div className="navbar-end md:gap-5 gap-2">
                        <a className=" text-sm md:text-base font-semibold">{Name}</a>
                        {/* <a className=" bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">Logout</a> */}
                        {
                            authUser ? <Logout />: null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar