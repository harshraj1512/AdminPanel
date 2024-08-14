import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        }
        try {
            const response = await axios.post("http://localhost:4001/api/user/login", userInfo);
            console.log('Response:', response.data);

            if (response.data) {
                // Store user information in localStorage or context if necessary
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                // Redirect to home page after successful login
                navigate('/home');
                toast.success('Login Successful');
                
                console.log('Navigating to /home');
                
            }
        } catch (err) {
            if (err.response) {
                console.log(err);
                toast.error("Error: " + err.response.data.message);
            }
        }
    };

    return (
        <>
            <div className="flex h-screen items-center justify-center ">
                <div className="w-[600px]">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">                            

                            <h3 className="font-bold text-lg">Login</h3>
                            
                            {/* Email */}
                            <div className="mt-4 space-y-2">
                                <span>Email</span>
                                <br />
                                <input type="email" placeholder="Enter your email" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("email", { required: true })} />
                                <br />
                                {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                            </div>
                            {/* Password */}
                            <div className="mt-4 space-y-2">
                                <span>Password</span>
                                <br />
                                <input type="password" placeholder="Enter your Password" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("password", { required: true })} />
                                <br />
                                {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                            </div>
                            {/* Button */}
                            <div className="flex justify-around mt-4">
                                <button className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 ">Login</button>
                                <p>
                                    Have account ?
                                    <span className="underline text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>Signup</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login