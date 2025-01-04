import { useState } from 'react'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'


import './App.css'
import Footer from './Components/Footer'


function App() {


  return (
    <>




      <Navbar />
       {/* For using backgrounds of Talwind CSS use https://bg.ibelick.com */}
      <div className=" bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
      </div>

      <Footer />






    </>
  )
}

export default App
