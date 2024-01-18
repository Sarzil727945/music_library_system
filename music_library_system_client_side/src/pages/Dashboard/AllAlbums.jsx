import React, { useContext, useEffect, useState } from 'react';
import Loader2 from '../../components/Shared/Loader2';
import { AuthContext } from '../../providers/AuthProvider';
import EmptyState from '../../components/Shared/EmptyState';
import { getSpecificAlbums } from '../../api/albums';
import AlbumDataRow from '../../components/Dashboard/AlbumDataRow';

const AllAlbums = () => {
     const { user } = useContext(AuthContext)
     const [specificAlbums, setSpecificAlbums] = useState([])
     const [loading, setLoading] = useState(true);

     const fetchSpecificAlbums = () => {
          getSpecificAlbums(user.email).then(albums => {
               setSpecificAlbums(albums);
               setLoading(false);
          })
     }

     useEffect(() => {
          fetchSpecificAlbums()
     }, [])

     return (
          <div>
               <>
                    {
                         loading ?
                              <div>
                                   <Loader2 />
                              </div> :
                              <div>
                              {specificAlbums && Array.isArray(specificAlbums) && specificAlbums.length > 0 ? (
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
                                                Release Year
                                              </th>
                                              <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                              >
                                                Genre
                                              </th>
                                              <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                              >
                                                Artists
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
                                            {specificAlbums &&
                                              specificAlbums?.map(album => (
                                                <AlbumDataRow
                                                  key={album?.id}
                                                  album={album}
                                                  fetchSpecificAlbums={fetchSpecificAlbums}
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
          </div>
     );
};

export default AllAlbums;