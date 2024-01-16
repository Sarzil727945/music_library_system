import React, { useContext, useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import Loader2 from '../../components/Shared/Loader2';
import { getChoiceRooms } from '../../api/addChoice';
import { AuthContext } from '../../providers/AuthProvider';
import { getAllRooms } from '../../api/rooms';
import ChoiceRoomDataRow from '../../components/Dashboard/ChoiceRoomDataRow';
import EmptyState from '../../components/Shared/EmptyState';

const ChoiceRooms = () => {
     const { user } = useContext(AuthContext)
     const [rooms, setRooms] = useState([])
     const [loading, setLoading] = useState(true);


     useEffect(() => {
          allChoiceRoom()
     }, []);

     function allChoiceRoom() {
          getChoiceRooms(user?.email).then((data) => {
               getAllRooms().then(allData => {
                    const userChoiceRooms = allData?.filter(room => data?.some(d => d?.roomDataId === room?._id));
                    setRooms(userChoiceRooms);
                    setLoading(false)
               })
          })
     }


     return (
          <div>
               <>
                    {
                         loading ?
                              <div>
                                   <Loader2 />
                              </div> :
                              <div>
                                   {
                                        rooms && Array.isArray(rooms) && rooms.length > 0 ? (
                                             <div className='container mx-auto px-4 sm:px-8'>
                                                  <div className='py-8'>
                                                       <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                                                 <table className='min-w-full leading-normal'>
                                                                      <thead>
                                                                           <tr>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     Title
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     Location
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     Price
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     From
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     To
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     Delete
                                                                                </th>
                                                                                <th
                                                                                     scope='col'
                                                                                     className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                                >
                                                                                     Order Now
                                                                                </th>
                                                                           </tr>
                                                                      </thead>

                                                                      <tbody>
                                                                           {
                                                                                rooms?.map((room, i) => (

                                                                                     <ChoiceRoomDataRow
                                                                                          key={room?._id}
                                                                                          room={room}
                                                                                          refetch={allChoiceRoom}
                                                                                     />
                                                                                ))
                                                                           }
                                                                      </tbody>

                                                                 </table>
                                                            </div>
                                                            {/* react pagination start */}
                                                            {/* <div className=" my-10 pagination">
                                                            <ReactPaginate
                                                                 previousLabel={'Previous'}
                                                                 nextLabel={'Next'}
                                                                 breakLabel={'...'}
                                                                 pageCount={pageCount}
                                                                 marginPagesDisplayed={2}
                                                                 pageRangeDisplayed={3}
                                                                 onPageChange={handlePageClick}
                                                                 containerClassName={'pagination'}
                                                                 subContainerClassName={'pages pagination'}
                                                                 activeClassName={'active'}
                                                            />
                                                       </div> */}
                                                            {/* react pagination end */}
                                                       </div>
                                                  </div>
                                             </div>
                                        ) :
                                             (
                                                  <EmptyState
                                                       message='No ChoiceRoom data available.'
                                                       address='/'
                                                       label='Browse Rooms'
                                                  />
                                             )
                                   }
                              </div>
                    }
               </>
          </div>
     );
};

export default ChoiceRooms;