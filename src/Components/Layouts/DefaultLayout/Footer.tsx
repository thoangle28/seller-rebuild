import { CURRENT_YEAR } from 'app/Constants'
import './style.scss';

const Footer = () => {
  return (
    <p className='footer p-3'>{CURRENT_YEAR} &copy; Addin SG</p>
  )
}

export default Footer