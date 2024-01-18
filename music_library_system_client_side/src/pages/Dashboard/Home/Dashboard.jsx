import './Dashboard.css'
import React, { useRef } from 'react';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BsFingerprint } from 'react-icons/bs';
import { GrUpdate } from "react-icons/gr";
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
import { BiCloudDownload } from 'react-icons/bi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
     // pdf part start 
     const dashboardRef = useRef();
     const dashboardToPDF = () => {
          const input = dashboardRef.current;
          html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
      
            const padding = 8;
            const imgWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', padding, padding, imgWidth, imgHeight);
            pdf.save('dashboardSA.pdf');
          });
        };
     // pdf part end

     const data = [
          {
               name: 'Page A',
               uv: 4000,
               pv: 2400,
               amt: 2400,
          },
          {
               name: 'Page B',
               uv: 3000,
               pv: 1398,
               amt: 2210,
          },
          {
               name: 'Page C',
               uv: 2000,
               pv: 9800,
               amt: 2290,
          },
          {
               name: 'Page D',
               uv: 2780,
               pv: 3908,
               amt: 2000,
          },
          {
               name: 'Page E',
               uv: 1890,
               pv: 4800,
               amt: 2181,
          },
          {
               name: 'Page F',
               uv: 2390,
               pv: 3800,
               amt: 2500,
          },
          {
               name: 'Page G',
               uv: 3490,
               pv: 4300,
               amt: 2100,
          },
     ];

     return (
          <div className='container mx-auto px-5 pt-10'>
               <div className='main-container'>
                    <div className="head-title flex items-end justify-end">
                         <button onClick={dashboardToPDF}>
                              <div className="lg:mt-0 mt-8 py-3">
                                   <div className="flex items-center btn-download bg-[#3C91E6] p-2 font-semibold rounded-[25px]">
                                        <div className=' me-1'>
                                             <BiCloudDownload size={24} />
                                        </div>
                                        <div>
                                             <span>Download PDF</span>
                                        </div>
                                   </div>
                              </div>
                         </button>
                    </div>
                    <div ref={dashboardRef}>
                         <div className='main-cards'>
                              <div className="card h-100 mb-4 shadow-sm bg-gradient-success row">
                                   <div className=' p-2 flex justify-between items-center'>
                                        <div >
                                             <h5 className="card-title text-center self-middle m-0 bg-light rounded-full p-1">
                                                  <MdHomeWork className='w-14 h-14' />

                                             </h5>
                                        </div>
                                        <div>
                                             <h2 className="card-title text-white  justify-end font-bold text-3xl">5</h2>
                                             <h6 className="card-title text-white">My Post Albums</h6>
                                        </div>
                                   </div>
                              </div>

                              <div className="card h-100 mb-4 shadow-sm bg-gradient-info">
                                   <div className=' p-2 flex justify-between items-center'>
                                        <div >
                                             <h5 className="card-title text-center self-middle m-0 bg-light rounded-full p-1">
                                                  <MdOutlineManageHistory className='w-14 h-14' />
                                             </h5>
                                        </div>
                                        <div>
                                             <h2 className="card-title text-white  justify-end font-bold text-3xl">5</h2>
                                             <h6 className="card-title text-white justify-end">My Post Songs</h6>
                                        </div>
                                   </div>
                              </div>

                              <div className="card h-100 mb-4 shadow-sm bg-gradient-danger">
                                   <div className=' py-7 px-2 flex justify-between items-center'>
                                        <div >
                                             <h5 className="card-title text-center self-middle m-0 bg-light rounded-full p-1">
                                                  <BsFingerprint className='w-12 h-12' />

                                             </h5>
                                        </div>
                                        <div>
                                             <h2 className="card-title text-white  justify-end font-bold text-3xl">5</h2>
                                             <h6 className="card-title text-white">Update Now Albums</h6>
                                        </div>
                                   </div>
                              </div>

                              <div className="card h-100 mb-4 shadow-sm bg-gradient-warning">
                                   <div className=' p-2 flex justify-between items-center'>
                                        <div >
                                             <h5 className="card-title text-center self-middle m-0 bg-light rounded-full p-1">
                                                  <GrUpdate className='w-12 h-12' />
                                             </h5>
                                        </div>
                                        <div>
                                             <h2 className="card-title text-white  justify-end font-bold text-3xl">2</h2>
                                             <h6 className="card-title text-white">Update Now Songs</h6>
                                        </div>
                                   </div>
                              </div>


                         </div>

                         <div className='charts'>
                              <ResponsiveContainer width="100%" height="100%">
                                   <BarChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                             top: 5,
                                             right: 30,
                                             left: 20,
                                             bottom: 5,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#8884d8" />
                                        <Bar dataKey="uv" fill="#82ca9d" />
                                   </BarChart>
                              </ResponsiveContainer>

                              <ResponsiveContainer width="100%" height="100%">
                                   <LineChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                             top: 5,
                                             right: 30,
                                             left: 20,
                                             bottom: 5,
                                        }}
                                   >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                   </LineChart>
                              </ResponsiveContainer>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Dashboard;
