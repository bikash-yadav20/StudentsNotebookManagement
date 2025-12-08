import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/kaizenlogo-removebg-preview (1).png'
import { StudentsContext } from '../../context/StudentsContext';

const SideBar = () => {
  const {logout} = useContext(StudentsContext);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex">
      {/* Toggle button (mobile only) */}
      <button
        className="md:hidden p-2 m-2 text-gray-700 hover:text-blue-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`fixed md:static left-0 h-full w-64 bg-white shadow-lg transform 
        ${isOpen ? 'translate-x-00' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 p-4 border-b">
          <img src={logo} alt="Kaizen Logo" className="h-10 w-auto" />
          <h3 className="text-lg font-semibold text-gray-800">KAIZEN ACADEMY</h3>
          <button onClick={() => setIsOpen(!isOpen)} className='md:hidden font-bold text-gray-700 text-lg cursor-pointer'>X</button>
        </div>

        {/* Navigation links using Link */}
        <nav className="mt-4 space-y-2 px-4">
          <Link to="/check-notebook" className="block py-2 px-3 rounded hover:bg-blue-100 text-gray-700">
            Check Notebook
          </Link>
          <Link to="/reports" className="block py-2 px-3 rounded hover:bg-blue-100 text-gray-700">
            Reports
          </Link>
          <Link to="/" className="block py-2 px-3 rounded hover:bg-blue-100 text-gray-700">
            Students
          </Link>
          <Link to="/" className="block py-2 px-3 rounded hover:bg-blue-100 text-gray-700">
            Settings
          </Link> 
          <button onClick={logout}>
            <Link to="/login"
          className='text-red-500 font-bold'>LogOut</Link>
          </button>
          
        </nav>
      </div>
    </div>
  )
}

export default SideBar
