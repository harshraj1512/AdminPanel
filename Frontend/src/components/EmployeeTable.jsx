import React, { useEffect, useState } from 'react';
import TableDetail from './TableDetail';
import { AllEmployees, DeleteEmployeeId } from './api.js';
import {  useNavigate } from 'react-router-dom';


function EmployeeTable() {
  const navigate = useNavigate();
  const [updateEmpObj, setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    "employees": [],
    "pagination": {
      "totalEmployee": 0,
      "currentpage":1,
      "totalPage": 1,
      "pageSize": 5
    }
  });

  const fetchEmployees = async(search ="", page = 1, limit = 5) => {
    try {
      const { data } = await AllEmployees(search, page, limit);
      console.log(data);
      setEmployeeData(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [])

  const handleUpdate = (empObj) => {
    console.log("update obj", empObj);
    setUpdateEmpObj(empObj);
    navigate('/addemployee', { state: { employee: empObj } });
  };

  const handleDelete = async (emp) => {
    try {
      const { success, message } = await DeleteEmployeeId(emp._id);
      if (success) {
        fetchEmployees();
        toast.success(message);
    } else {
        toast.error(message);
    }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchEmployees(term);
  }

  return (
    <>
    <div>
    <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10 border bg-yellow-400">
        <a className="text-black text-xl font-bold">Employee List</a>
    </div>
    <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10 flex flex-col justify-end md:flex-row  md:space-x-4 space-y-2 md:space-y-0">
      <a className="mt-4">Total Count: {employeeData.pagination.totalEmployee}</a>
      <button onClick={() => navigate('/addemployee')} className="btn mt-1 bg-green-500 text-black w-32 md:w-auto flex-none">Create Employee</button>
    </div>
    <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10 md:flex md:justify-end md:flex-row  md:space-x-5  hidden md:block">
      <a className="mt-4 text-xl font-bold">search</a>
      <input type="text" placeholder="Type here" onChange={handleSearch} className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
      <TableDetail
       handleUpdate={handleUpdate}
       fetchEmployees = {fetchEmployees}
       employees = {employeeData.employees}
       pagination = {employeeData.pagination}
       handleDelete={handleDelete}
      />
    </div>
    </div>
    </>
  )
}

export default EmployeeTable;