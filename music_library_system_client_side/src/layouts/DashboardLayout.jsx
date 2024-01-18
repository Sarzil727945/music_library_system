import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import { AuthContext } from '../providers/AuthProvider'
import { useContext,  useState } from 'react'
import { CiDark } from "react-icons/ci";
import Logo from '../components/Shared/Navbar/Logo'
import { MdOutlineLightMode } from 'react-icons/md';
// import SideNavbar from '../components/Dashboard/SideNavbar'

const DashboardLayout = () => {

     const { user } = useContext(AuthContext)
     const [userBookings, setUserBookings] = useState([])
     const [darkLight, setDarkLight] = useState(false)


     const bgDarkLight = () => {
          if (darkLight) {
               localStorage.setItem('bgSidebar', 'bg-gray-100')
               localStorage.setItem('bgNavbar', 'bg-base-100')
               localStorage.setItem('bgOutlet', 'bg-[#fff]')
          }
          else {
               localStorage.setItem('bgSidebar', 'bg-[#182235] text-[#cfcbcb]')
               localStorage.setItem('bgNavbar', 'bg-[#182235] text-[#cfcbcb]')
               localStorage.setItem('bgOutlet', 'bg-[#0F172A]')
          }
          setDarkLight(!darkLight)
     }

     const bgSidebar = typeof window !== 'undefined' ? window.localStorage.getItem('bgSidebar') : null;
     const bgNavbar = typeof window !== 'undefined' ? window.localStorage.getItem('bgNavbar') : null;
     const bgOutlet = typeof window !== 'undefined' ? window.localStorage.getItem('bgOutlet') : null;

     return (
          <div className={`relative min-h-screen md:flex ${bgOutlet}`}>
               <div className={`${bgSidebar || 'bg-gray-100'} shadow z-30 `}>
                    <Sidebar />
               </div>
               <div className='flex-1  md:ml-64'>
                    <div className='sticky top-12 md:top-0 z-20'>
                         {/* <SideNavbar /> */}
                         <div className={`${bgNavbar || 'bg-base-100'} shadow py-2 lg:px-5 `} >
                              <div className={`navbar ${bgNavbar}`}>
                                   <div className="flex-1">
                                        <Logo />
                                   </div>
                                   <div className="flex-none lg:me-5">
                                        <div onClick={() => bgDarkLight()}>
                                             <label className="btn btn-ghost btn-circle">
                                                  {
                                                       (bgOutlet === 'bg-[#0F172A]') ?
                                                            <CiDark className=' w-8 h-8' /> :
                                                            <MdOutlineLightMode className='w-8 h-8' />
                                                  }
                                             </label>
                                        </div>
                                        <div className="dropdown dropdown-end mx-2">
                                             <label tabIndex={0} className="btn btn-ghost btn-circle">
                                                  <div className="indicator">
                                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                       <span className="badge badge-sm indicator-item">{userBookings?.length}</span>
                                                  </div>
                                             </label>

                                        </div>
                                        <div>
                                             <button className="btn btn-ghost btn-circle">
                                                  <div className="indicator">
                                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                                       <span className="badge badge-xs badge-primary indicator-item"></span>
                                                  </div>
                                             </button>

                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className='p-5'>
                         <Outlet />
                    </div>
               </div>
          </div>
     )
}

export default DashboardLayout