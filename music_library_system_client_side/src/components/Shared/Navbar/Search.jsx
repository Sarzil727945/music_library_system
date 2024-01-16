import { useState } from 'react';
import { BiSearch } from 'react-icons/bi'
import { useSearchContext } from '../../../providers/SearchContext';

const Search = () => {

  const [searchText, setSearchText] = useState('')
  const { setHomeData, setFriendsData, setReqFriendsData } = useSearchContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/postSearchText/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setHomeData(data);
        // setIsLoading(false);
      });

    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/userSearchText/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setFriendsData(data);
        // setIsLoading(false);
      });

    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/requestUserSearch/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setReqFriendsData(data);
        // setIsLoading(false);
      });
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };


  return (
    <div >
      <form onSubmit={handleSubmit} className='flex flex-row items-center justify-between relative'>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          name='search'
          placeholder="Search SA"
          className="input input-bordered w-[255px] lg:w-[400px] lg:h-[55px] rounded-full"
        />
        <button className='p-2 bg-rose-500 rounded-full text-white ms-[215px] lg:ms-[355px] absolute'>
          <BiSearch size={18} />
        </button>
      </form>
    </div>
  )
}

export default Search
