import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import UpdateRoomForm from '../Forms/UpdateAlbumForm'
import { toast } from 'react-hot-toast'
import { updateAlbums } from '../../api/albums'

const UpdateAlbumModal = ({ setIsEditModalOpen, isOpen, fetchSpecificAlbums, album, id }) => {
  const [loading, setLoading] = useState(false)
  const [Albums, setAlbums] = useState(album)
  const [selectedArtists, setSelectedArtists] = useState([]);


  const handleSubmit = event => {
    event.preventDefault()

    const id = Albums?.id
    const title = Albums?.title;
    const genre = Albums?.genre;
    const year = Albums?.release_year
    const artistID = selectedArtists + ''
    const hostEmail = Albums?.host_email

    const albumsUpdateData = { id, title, genre, year, artistID, hostEmail }
    setLoading(true)

    updateAlbums(id, albumsUpdateData).then(data => {
      toast.success('Albums info updated')
      setLoading(false)
      fetchSpecificAlbums()
      setIsEditModalOpen(false)
    })
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[55rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Album Info
                </Dialog.Title>
                <div className='mt-2 w-full'>
                  <UpdateRoomForm
                    handleSubmit={handleSubmit}
                    Albums={Albums}
                    setAlbums={setAlbums}
                    loading={loading}
                    selectedArtists={selectedArtists}
                    setSelectedArtists={setSelectedArtists}
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateAlbumModal
