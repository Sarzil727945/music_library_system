import { useContext } from 'react'
import avatarImg from '../../../assets/images/placeholder.jpg'
import { AuthContext } from '../../../providers/AuthProvider'
import { getUsers } from '../../../api/users'
import { useEffect } from 'react'
import { useState } from 'react'

const Avatar = () => {
  const { user } = useContext(AuthContext)
  const [myInfo, setMyInfo] = useState()

  useEffect(() => {
    userDataGet()
  }, [user])

  function userDataGet() {
    getUsers(user?.email)
      .then(d => {
        setMyInfo(d);
      })
  }
  return (
    <img
      className='rounded-full'
      src={user && myInfo?.img ? myInfo?.img : avatarImg}
      alt='profile'
      height='30'
      width='30'
    />
  )
}

export default Avatar
