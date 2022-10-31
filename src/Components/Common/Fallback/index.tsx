import {FC} from 'react'
import './style.scss'
import logo from './../../../app/Images/logo.svg'
import fallbackImg from './../../../app/Images/fallback.png'

const FallBack: FC = () => {
  return (
    <div className='fallback d-flex flex-column align-items-center justify-content-center'>
      <img src={logo} alt='logo' className='fallback__logo mb-4' />
      <img src={fallbackImg} alt='fallback img' className='fallback__img' />

      <div className='fallback__bottom'>
        <img
          src={require('./../../../app/Images/shopping-gif.gif')}
          alt='shopping nào'
        />
        <div></div>
      </div>
    </div>
  )
}

export default FallBack
