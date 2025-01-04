import React from 'react'
import Snow from '../Snow'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white'>
      <div className='flex justify-around px-4 py-5  text-white gap-4 items-center h-10 overflow-hidden '>
        <div className='font-bold text-2xl custom-375:relative custom-375:right-2 custom-360:relative custom-360:right-2 custom-344:relative custom-344:right-2'><span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span></div>
        <Snow />
        {/* <ul className='flex gap-4'>
            <li>
            <a className='hover:font-bold' href="/">Home</a>
            </li>
            <li>
            <a className='hover:font-bold' href="#">About</a>
            </li>
            <li>
            <a className='hover:font-bold' href="#">Contact</a>
            </li>
            </ul> */}
        <button className='text-white bg-green-700 my-5 mx-2  rounded-full flex justify-between items-center custom-375:relative custom-375:left-5 custom-360:relative custom-360:left-6 custom-344:relative custom-344:left-5 custom-344:mx-1 '>
          <img className='invert w-8 p-1' src="icons/github.svg" alt="" />
          <span className='font-bold px-2'><a href="https://github.com/AmCoder2104">GitHub</a></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar