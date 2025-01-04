import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  // State to manage form inputs
  const [form, setform] = useState({ site: '', username: '', password: '' })
  
  // State to manage the array of passwords
  const [passwordArray, setpasswordArray] = useState([])

  // Effect to load passwords from localStorage on component mount
  useEffect(() => {
    let temp = localStorage.getItem('passwords')
    if (temp) {
      setpasswordArray(JSON.parse(temp))
    }
  }, [])

  // Function to save a new password
  const savepass = () => {
    // Check if form inputs are valid
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // Add new password to the array with a unique id
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })
      toast.success('Password Saved!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error('Please fill all the fields properly!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  // Function to handle form input changes
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  // Refs for toggling password visibility
  const ref = useRef()
  const passref = useRef()

  // Function to toggle password visibility
  const toggle = () => {
    if (ref.current.src.includes('eyecross.png')) {
      passref.current.type = 'password'
      ref.current.src = 'icons/eye.png'
    } else {
      ref.current.src = 'icons/eyecross.png'
      passref.current.type = 'text'
    }
  }

  // Function to copy text to clipboard
  const copytext = (text) => {
    toast.success('Copy to Clipboard!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  // Function to edit a password
  const Editpass = (id) => { 
    setform(passwordArray.filter(i => i.id === id)[0]) 
    setpasswordArray(passwordArray.filter(item => item.id !== id)) 
  }

  // Function to delete a password
  const Deletepass = (id) => {
    let c = confirm('Are you sure you want to delete this password?')
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id))) 
      toast.success('Password Deleted!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='p-3 md:p-5 md:custom min-h-[86.3vh]'>
        <h1 className='text-center text-4xl font-bold'>
          <span className='text-green-600'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-600'>OP/&gt;</span>
        </h1>
        <p className='text-lg text-green-900 text-center'>Your own password manager</p>
        <div className='flex flex-col p-4 text-black gap-8 items-center'>
          <input value={form.site} onChange={handlechange} className='rounded-full p-4 py-1 w-full border border-green-500' type="text" placeholder='Enter Website URL' name='site' />
          <div className='flex flex-col md:flex-row gap-8 justify-between w-full'>
            <input value={form.username} onChange={handlechange} className='rounded-full p-4 py-1 w-full border border-green-500' type="text" placeholder='Enter Username' name='username' />
            <div className='relative'>
              <input value={form.password} onChange={handlechange} className='rounded-full p-4 py-1 w-full border border-green-500' type="password" ref={passref} placeholder='Enter Password' name='password' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer'>
                <img className='p-1' width={26} ref={ref} onClick={toggle} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savepass} className='flex justify-center items-center bg-green-500 hover:bg-green-400 py-2 px-5 rounded-full w-fit gap-2 border-2 hover:border-green-900'>
            <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json" trigger="hover"></lord-icon>
            Add Password
          </button>
        </div>
        <div>
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto mb-7 rounded-md overflow-hidden w-full">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Alternations</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className='py-2 text-center w-32 border border-white'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <span onClick={() => { copytext(item.site) }} className='lordiconcopy size-7 cursor-pointer'>
                          <lord-icon src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" style={{ 'width': '20px', 'height': '20px', 'paddingTop': '3px', 'paddingLeft': '6px' }}></lord-icon>
                        </span>
                      </td>
                      <td className='py-2 text-center w-32 border border-white'>
                        {item.username}
                        <span onClick={() => { copytext(item.username) }} className='lordiconcopy size-7 cursor-pointer'>
                          <lord-icon src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" style={{ 'width': '20px', 'height': '20px', 'paddingTop': '3px', 'paddingLeft': '0px' }}></lord-icon>
                        </span>
                      </td>
                      <td className='py-2 text-center w-32 border border-white'>
                        {item.password}
                        <span onClick={() => { copytext(item.password) }} className='lordiconcopy size-7 cursor-pointer'>
                          <lord-icon src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover" style={{ 'width': '20px', 'height': '20px', 'paddingTop': '3px', 'paddingLeft': '0px' }}></lord-icon>
                        </span>
                      </td>
                      <td className='py-2 text-center w-32 border border-white'>
                        <span onClick={() => { Editpass(item.id) }} className='cursor-pointer mx-1'>
                          <lord-icon src="https://cdn.lordicon.com/lsrcesku.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                        </span>
                        <span onClick={() => { Deletepass(item.id) }} className='cursor-pointer mx-1'>
                          <lord-icon src="https://cdn.lordicon.com/xekbkxul.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager