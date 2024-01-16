import { useContext, useEffect, useState } from 'react'
import { getRooms } from '../../api/rooms'
import { AuthContext } from '../../providers/AuthProvider'
import RoomDataRow from '../../components/Dashboard/RoomDataRow'
import EmptyState from '../../components/Shared/EmptyState'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import '../ReactPaginate/ReactPaginate.css'
import Loader2 from '../../components/Shared/Loader2'
import Pagination from '../../components/Shared/Pagination'
import { useParams } from 'react-router-dom'

const MyListings = () => {
  const { id } = useParams()
  const searchParams = id;
  const [axiosSecure] = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageRooms, setPageRooms] = useState([]);

  const { refetch, data: rooms = [] } = useQuery({
    queryKey: ['rooms', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/rooms/${user?.email}`
      )
      setData(res.data)
      setLoading(false)
      return res.data
    },
  })

  // pagination part start new 
  const totalData = data?.length
  const dataPerPage = 5

  const totalPages = Math.ceil(totalData / dataPerPage)
  let currentPage = 1
  if (Number(searchParams) >= 1) {
    currentPage = Number(searchParams)
  }



  const getUserRooms = async () => {
    const url = `${import.meta.env.VITE_API_URL}/rooms/${user?.email}/${currentPage}/${dataPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
    setPageRooms(data);
  };

  useEffect(() => {
    getUserRooms();
  }, [currentPage]);

  let pageNumber = []
  for (let index = currentPage - 2; index <= currentPage + 2; index++) {
    if (index < 1) {
      continue
    }
    if (index > totalPages) {
      break
    }
    pageNumber.push(index)
  }
  const activePage = (searchParams) ? parseInt(searchParams) : 1;


  return (
    <>
      {
        loading ?
          <div>
            <Loader2 />
          </div> :
          <div>
            {rooms && Array.isArray(rooms) && rooms.length > 0 ? (
              <div className='container mx-auto px-4 sm:px-8'>
                {/* react pagination start */}
                <div className=" mt-2">
                  <Pagination pageNumber={pageNumber} activePage={activePage} currentPage={currentPage} totalPages={totalPages} totalData={totalData} />
                </div>
                {/* react pagination end */}
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
                              Update
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rooms &&
                            pageRooms?.map(room => (
                              <RoomDataRow
                                key={room?._id}
                                room={room}
                                refetch={refetch}
                                getUserRooms={getUserRooms}
                              />
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                message='No Room data available.'
                address='/dashboard/add-room'
                label='Add Rooms'
              />
            )}
          </div>
      }

    </>
  )
}

export default MyListings
