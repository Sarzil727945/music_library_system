import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import Logo from '../Shared/Navbar/Logo'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import GuestMenu from './GuestMenu'
import { getSpecificUser } from '../../api/users'
const Sidebar = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const { user, logOut, role } = useContext(AuthContext)
  const [myInfo, setMyInfo] = useState([])

  const [isActive, setActive] = useState('false')
  const toggleHandler = event => {
    setToggle(event.target.checked)
  }
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const handleLogOut = () => {
    logOut()
    navigate('/dashboard/my-dashboard')
  }

  useEffect(() => {
    userDataGet()
  }, [])

  function userDataGet() {
    getSpecificUser(user?.email)
      .then(d => {
        setMyInfo(d);
      })
  }
  const bgSidebar = typeof window !== 'undefined' ? window.localStorage.getItem('bgSidebar') : null;

console.log(myInfo);
  return (
    <div>
      {/* Small Screen Navbar */}
      <div>
        <div className='text-gray-800 flex justify-between md:hidden z-20 fixed top-0'>
          <div>
            <div className='cursor-pointer p-4 font-bold hidden md:block'>
              <Logo/>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 ml-80'
          >
            <AiOutlineBars className='h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden ${bgSidebar || 'bg-gray-100'}  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='flex flex-col items-center mt-8 -mx-2'>
              <Link to='my-dashboard'>
                <img
                  className='object-cover w-24 h-24 mx-2 rounded-full'
                  src={myInfo[0]?.pic}
                  alt='avatar'
                  referrerPolicy='no-referrer'
                />
              </Link>
              <Link to='my-dashboard'>
                <h4 className='mx-2 mt-2 font-medium text-gray-800  hover:underline'>
                  {myInfo[0]?.name}
                </h4>
              </Link>
              <Link to='my-dashboard'>
                <p className='mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline'>
                  {user?.email}
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
             
                <GuestMenu />
              
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
