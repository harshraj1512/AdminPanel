import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import BASE_URL from "./user.api"
import toast from 'react-hot-toast';

function Signup() {
  //const location = useLocation();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }
    await axios.post(`http://localhost:4001/api/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          toast.success("login Successfully");
          navigate("/");
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }).catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">

              <h3 className="font-bold text-lg">Signup</h3>
              {/* Name */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input type="text" placeholder="Enter Your Name" className="w-80 px-3 py-1 border rounded-md outline-none" {...register("fullname", { required: true })} />
                <br />
                {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}
              </div>
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
                <button className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 ">Signup</button>
                <p>
                  Have account ?
                  <span className="underline text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Login</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup