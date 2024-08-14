import React from 'react'

function TableDetail({
  employees,
  pagination,
  fetchEmployees,
  handleUpdate,
  handleDelete
}) {
  const headers = ["Unique id", "Image", "Name", "Email", "Mobile No", "Designation", "Gender", "Course", "Create Date", "Action"];
  const { currentpage, totalPage } = pagination;
  const pageNumber = Array.from({length: totalPage}, (_, index) => index+1);
  
  const handleNext = () => {
    if (currentpage < totalPage) {
      handlePagination(currentpage + 1);
    }
  }
  
  const handlePrevious = () => {
    if (currentpage > 1) {
      handlePagination(currentpage - 1);
    }
  }
  const handlePagination = (currPage) => {
    fetchEmployees("", currPage, 5);
  }

  const TableRow = ({ employee }) => {
    return <tr>
      <td>{employee._id}</td>
      <td>{<div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src= {employee.pimage}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.designation}</td>
      <td>{employee.gender}</td>
      <td>{Array.isArray(employee.course) ? employee.course.join(', ') : employee.course}</td>
      <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
      <td>
        <button className="btn" onClick={() => handleDelete(employee)}>Delete</button>
        <button className="btn" onClick={() => handleUpdate(employee)}>Edit</button>
      </td>
    </tr>
  }
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                {
                  headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                employees.map((emp) => (
                  <TableRow key = {emp._id} employee = {emp} />
                ))
              }
              
            </tbody>
          </table>

          <div className="flex justify-between items-center my-3">
              <span className="">Page {currentpage} of {totalPage}</span>
              <div>
                <button
                 className="btn"
                 onClick={() => handlePrevious()}
                 disabled={currentpage === 1}
                >
                  Prevoius
                </button>

                {
                  pageNumber.map((page) => (
                    <button className="btn border-black mx-2">
                      {page}
                    </button>
                  ))
                }

                <button
                 className="btn"
                 onClick={() => handleNext()}
                 disabled={totalPage === currentpage}
                >
                  Next
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default TableDetail