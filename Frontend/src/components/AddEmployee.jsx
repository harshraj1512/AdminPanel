import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CreateEmployees, UpdateEmployees } from './api';
import toast from 'react-hot-toast';

function AddEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        designation: "",
        gender: "",
        course: [],
        pimage: null
    });

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        // employee data is passed
        if (location.state?.employee) {
            setIsUpdate(true);
            const { employee } = location.state;
            setEmployee({
                ...employee,
                course: employee.course || [],  // Ensure course is always an array
            });
        }
    }, [location.state]);

    const resetEmployee = () => {
        setEmployee({
            email: "",
            phone: "",
            designation: "",
            gender: "",
            course: [],
            pimage: null 
        })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEmployee((prevState) => {
            if (checked) {
                return { ...prevState, course: [...prevState.course, name] };
            } else {
                return { ...prevState, course: prevState.course.filter((course) => course    !== name) };
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    }

    const handleFileChange = (e) => {
        setEmployee({ ...employee, pimage: e.target.files[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee);
        try {
            const{ success, message } = isUpdate ? await UpdateEmployees(employee, employee._id) : await CreateEmployees(employee);
            if (success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
            resetEmployee();
            navigate('/home'); 
        } catch (err) {
            toast.error('Error: ' + err.message);
        }
    }
    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl container mx-auto px-4 py-2  md:px-10 border bg-yellow-400 flex justify-between items-center">
                <a className="text-black text-xl font-bold">{isUpdate ? 'Update Employee' : 'Create Employee'}</a>
                <button className="btn bg-black text-white hover:bg-slate-800" onClick={()=> navigate("/employeetable")}>Back</button>
            </div>
            <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10 flex justify-center">
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-5 mt-4">
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Name</label>
                        <input type="text" className="input input-bordered border-black w-full max-w-xs" name="name" value={employee.name} onChange={handleChange} required></input>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Email</label>
                        <input type="email" className="input input-bordered border-black w-full max-w-xs" name="email" value={employee.email} onChange={handleChange} required></input>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Mobile</label>
                        <input type="text" className="input input-bordered border-black w-full max-w-xs" name="phone" value={employee.phone} onChange={handleChange} required></input>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Designation</label>
                        <input type="text" className="input input-bordered border-black w-full max-w-xs" name="designation" value={employee.designation} onChange={handleChange} required></input>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Gender</label>
                        <div className="flex items-center ml-2">
                            <label className="mr-4">
                                <input type="radio" className="mr-1" name="gender" value={"Male"} checked={employee.gender === "Male"} onChange={handleChange} required />
                                Male
                            </label>
                            <label className="mr-4">
                                <input type="radio" className="mr-1" name="gender" value={"Female"} checked={employee.gender === "Female"} onChange={handleChange} required />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Courses</label>
                        <div className="flex items-center ml-2 space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="MCA"
                                    checked={employee.course.includes('MCA')}
                                    onChange={handleCheckboxChange}
                                    className="mr-1"
                                />
                                MCA
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="BCA"
                                    checked={employee.course.includes('BCA')}
                                    onChange={handleCheckboxChange}
                                    className="mr-1"
                                />
                                BCA
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="MS"
                                    checked={employee.course.includes('MS')}
                                    onChange={handleCheckboxChange}
                                    className="mr-1"
                                />
                                MS
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="flex-none w-32 text-lg">Image</label>
                        <input type="file" className="w-full max-w-xs" name="pimage" onChange={handleFileChange}></input>
                    </div>
                    <button className="btn bg-green-400 hover:bg-green-600" type="submit">{isUpdate ? 'Update' : 'Save'}</button>
                </form>
            </div>
        </>
    )
}

export default AddEmployee;