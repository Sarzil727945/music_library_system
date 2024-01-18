import { Link } from 'react-router-dom'
import logoImg from '../../../assets/images/loogavif.avif'

const Logo = () => {
  return (
      <img
        className='hidden md:block'
        src={logoImg}
        alt='logo'
        width='100'
        height='100'
      />
  )
}

export default Logo
