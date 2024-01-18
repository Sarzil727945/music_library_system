import React, { useContext, useEffect, useState } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb'
import { categories } from '../../components/Categories/categoriesData'
import { AuthContext } from '../../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { saveAlbumsData } from '../../api/albums'
import { getArtists } from '../../api/artists'

const Albums = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [selectedArtists, setSelectedArtists] = useState([]);

  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(false)

  
  // handle form submit
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    const form = event.target
    const title = form.title.value
    const genre = form.genre.value
    const year = form.year.value
    const artistID = selectedArtists+''
    const hostEmail = user?.email

    const albumsData ={title, genre, year, artistID, hostEmail}

    saveAlbumsData(albumsData)
    .then((data) => {
      console.log(data);
      setLoading(false);
      navigate('/dashboard/my-albums')
    })
    .catch((error) => {
      console.error('Error posting data:', error);
      setLoading(false);
    });

  }

  const handleCheckboxChange = (artistId) => {
    setSelectedArtists((prevSelected) => {
      if (prevSelected.includes(artistId)) {
        // Remove the artist if already selected
        return prevSelected.filter((id) => id !== artistId);
      } else {
        // Add the artist if not selected
        return [...prevSelected, artistId];
      }
    });
  };

  useEffect(() => {
    getArtists().then((artists) => {
      setArtists(artists);
    })
  }, [])


  
  return (
    <div>
      <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='space-y-6'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='location' className='block text-gray-600'>
                  Title
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                  name='title'
                  id='title'
                  type='text'
                  placeholder='title'
                  required
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='category' className='block text-gray-600'>
                  Genre
                </label>
                <select
                  required
                  className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                  name='genre'
                >
                  {categories.map(category => (
                    <option value={category.label} key={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div className='space-y-6'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='title' className='block text-gray-600'>
                  Release Year
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                  name='year'
                  id='year'
                  type='number'
                  placeholder='year'
                  required
                />
              </div>

              <div className='  w-full  m-auto rounded-lg'>
                <label htmlFor='title' className='block text-gray-600'>
                  Artists
                </label>
                <div className=' flex'>
                  {artists?.map((art, inx) => (
                    <div key={inx}>
                      <label className='label cursor-pointer me-3'>
                        <input
                          type='checkbox'
                          className='checkbox'
                          checked={selectedArtists.includes(art.id)}
                          onChange={() => handleCheckboxChange(art.id)}
                        />
                        <span className='ms-2'>{art?.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
          >
            {loading ? (
              <TbFidgetSpinner className='m-auto animate-spin' size={24} />
            ) : (
              'Save & Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Albums