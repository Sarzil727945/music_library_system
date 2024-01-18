import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { MdDataThresholding, MdNoteAdd } from 'react-icons/md'
const GuestMenu = () => {
  
  return (
    <>

      <NavLink
        to='my-dashboard'
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
          }`
        }
      >
        <AiFillDashboard className='w-5 h-5' />

        <span className='mx-4 font-medium'>My Dashboard</span>
      </NavLink>

      

        <NavLink
          to='add-albums'
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
            }`
          }
        >
          <MdNoteAdd className='w-5 h-5' />

          <span className='mx-4 font-medium'>Add Albums</span>
        </NavLink>

        <NavLink
          to='my-albums'
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
            }`
          }
        >
          <MdDataThresholding className='w-5 h-5' />

          <span className='mx-4 font-medium'>My Albums</span>
        </NavLink>
    </>
  )
}

export default GuestMenu
