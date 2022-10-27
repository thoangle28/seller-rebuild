import { CURRENT_YEAR } from 'app/Constants'
import './style.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <span><span style={{color:"background: rgba(0, 0, 0, 0.6)"}}>{CURRENT_YEAR} &copy;</span> Addin SG</span>
    </div>
  )
}

export default Footer