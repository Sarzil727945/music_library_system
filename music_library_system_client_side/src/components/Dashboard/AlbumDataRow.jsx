import React, { useState } from 'react'
import toast from 'react-hot-toast'
import DeleteModal from '../Modal/DeleteModal'
import { deleteAlbums } from '../../api/albums'
import UpdateAlbumModal from '../Modal/UpdateAlbumModal'

const AlbumDataRow = ({ album, fetchSpecificAlbums }) => {
  let [isOpen, setIsOpen] = useState(false)
  let [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const modalHandler = id => {
    deleteAlbums(id)
      .then(data => {
        fetchSpecificAlbums()
        toast.success('Room deleted')
      })
      .catch(err => console.log(err))
    closeModal()
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <p className='text-gray-900 whitespace-no-wrap'>{album?.title}</p>
            </div>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{album?.release_year}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{album?.genre}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <p className='text-gray-900 whitespace-no-wrap'>{album?.artists}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={album.id}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdateAlbumModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          album={album}
          id={album.id}
          fetchSpecificAlbums={fetchSpecificAlbums}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  )
}

export default AlbumDataRow
