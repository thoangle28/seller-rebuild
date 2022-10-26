import {
  faUser,
  faEnvelope,
  faLocationDot,
  faPhoneFlip,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import defaultUploadImg from './../../../app/Images/default-upload-img.png'
import uploadIcon from './../../../app/Images/icons/upload-icon.svg'
import './style.scss'

const infoUser = [
  {
    icon: faUser,
    text: 'Thien Thuan',
  },
  {
    icon: faEnvelope,
    text: 'thienthuann61@gmail.com',
  },
  {
    icon: faLocationDot,
    text: 'Thanh Pho Hue',
  },
  {
    icon: faPhoneFlip,
    text: '0865146954',
  },
]

const MyProfile:FC = () => {
  // Render list info
  const infoUserList = infoUser.map((item) => (
    <li className='user-info__item' key={item.text}>
      <span className='user-info__icon d-inline-block'>
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span className='user-info__text d-inline-block'>{item.text}</span>
    </li>
  ))

  return (
    <div className='my-profile me-3'>
      <div className='user-avatar d-flex justify-content-center align-items-center mx-auto mb-3'>
        <img src={defaultUploadImg} alt='avatar' />

        <div className='upload__wrap'>
          <input type='file' id='upload-avatar' />
          <label htmlFor='upload-avatar'>
            <img src={uploadIcon} alt='upload icon' />
          </label>
        </div>
      </div>

      <h3 className='user-fullname text-center text-uppercase'>Thuan Nguyen</h3>

      <div className='user-info mt-4'>
        <ul className='user-info__list m-0'>{infoUserList}</ul>
      </div>
    </div>
  )
}

export default MyProfile
