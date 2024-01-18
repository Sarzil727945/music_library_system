import React, { useEffect, useState } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb'
import { categories } from '../Categories/categoriesData'
import { getArtists } from '../../api/artists'
const UpdateAlbumForm = ({
  handleSubmit,
  loading,
  Albums,
  setAlbums,
  selectedArtists,
  setSelectedArtists,
}) => {

  const [artists, setArtists] = useState([])

  useEffect(() => {
    getArtists().then((artists) => {
      setArtists(artists);
    })
  }, [])

  useEffect(() => {
    const artistsIdArr = (Albums?.artists_id || '').split(',').map(item => parseInt(item, 10));
    setSelectedArtists(artistsIdArr || []);
    console.log();
  }, [Albums?.artists_id]);

  const handleCheckboxChange = (artistId) => {
    setSelectedArtists((prevSelected) => {
      if (prevSelected.includes(artistId)) {
        return prevSelected.filter((id) => id !== artistId);
      } else {
        return [...prevSelected, artistId];
      }
    });

  };
  return (
    <div className='w-full min-h-[calc(70vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
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
                value={Albums?.title}
                onChange={event =>
                  setAlbums({ ...Albums, title: event.target.value })
                }
                id='title'
                type='text'
                placeholder='title'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600'>
                genre
              </label>
              <select
                onChange={event =>
                  setAlbums({ ...Albums, genre: event.target.value })
                }
                required
                defaultValue={Albums?.genre}
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
                value={Albums?.release_year}
                onChange={event =>
                  setAlbums({ ...Albums, release_year: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='release_year'
                id='release_year'
                type='number'
                placeholder='Release Year'
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
                    <label className='label cursor-pointer'>
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
            'Update'
          )}
        </button>
      </form>
    </div>
  )
}

export default UpdateAlbumForm
