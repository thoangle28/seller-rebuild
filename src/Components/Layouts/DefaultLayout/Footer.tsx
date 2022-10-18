import { CURRENT_YEAR } from 'app/Constants'
import './style.scss';

const Footer = () => {
  return (
    <div className='footer py-4'>
      <span>{CURRENT_YEAR} &copy; Addin SG</span>
    </div>
  )
}

export default Footer