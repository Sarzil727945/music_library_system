// SearchContext
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [homeData, setHomeData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [reqFriendsData, setReqFriendsData] = useState([]);

  const searchInfo = {
    homeData,
    friendsData,
    reqFriendsData,
    setHomeData,
    setFriendsData,
    setReqFriendsData,
  }
  return (
    <SearchContext.Provider value={searchInfo}>
      {children}
    </SearchContext.Provider>
  );
};
