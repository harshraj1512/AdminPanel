import React from 'react';

function Banner() {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto px-4 py-2 md:px-10 border bg-yellow-400">
        <a className="text-black text-xl font-bold">Dashboard</a>
    </div>
    <div className="flex items-center justify-center mt-72 md:mt-48">
      <span className="md:text-6xl font-semibold text-2xl ">Welcome To Admin Panel</span>
    </div>
    </>
  )
}

export default Banner