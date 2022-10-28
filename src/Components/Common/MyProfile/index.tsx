import {useState} from 'react'
import {
  faUser,
  faEnvelope,
  faLocationDot,
  faPhoneFlip,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Loading from '../Loading'
import defaultUploadImg from './../../../app/Images/default-upload-img.png'
import uploadIcon from './../../../app/Images/icons/upload-icon.svg'
import './style.scss'
import {convertBase64} from 'app/Utils'

interface Props {
  data: any
  isLoading: boolean
}

const MyProfile = (props: Props) => {
  const {data, isLoading} = props

  const [avatarUser, setAvatarUser] = useState<string>('')

  const {firstname, lastname, avatar, contactEmail, contactPhone, address} =
    data
  const fullName = `${firstname} ${lastname}`

  const infoUser = [
    {
      icon: faUser,
      text: fullName,
      textCappitalize: true,
    },
    {
      icon: faEnvelope,
      text: contactEmail,
    },
    {
      icon: faLocationDot,
      text: address || 'Unknown',
    },
    {
      icon: faPhoneFlip,
      text: contactPhone || 'Unknown',
    },
  ]

  const handleUploadAvatar = async (e: any) => {
    const file = e.target.files[0]

    try {
      const base64: any = await convertBase64(file)
      setAvatarUser(base64)
    } catch (error) {}
  }

  // Render list info
  const infoUserList = infoUser.map((item, index) => (
    <li className='user-info__item' key={index}>
      <span className='user-info__icon d-inline-block'>
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span
        className={`user-info__text d-inline-block ${
          item.textCappitalize ? 'text-capitalize' : ''
        }`}>
        {item.text}
      </span>
    </li>
  ))

  return (
    <div className='my-profile'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <div className='user-avatar d-flex justify-content-center align-items-center mx-auto mb-4'>
            {avatar || avatarUser ? (
              <img src={avatarUser || avatar} alt='avatar' />
            ) : (
              <img
                src={defaultUploadImg}
                alt='avatar default'
                className='avatar-default'
              />
            )}

            <div className='upload__wrap'>
              <input
                type='file'
                id='upload-avatar'
                onChange={handleUploadAvatar}
              />
              <label htmlFor='upload-avatar'>
                <img src={uploadIcon} alt='upload icon' />
              </label>
            </div>
          </div>
          <h3 className='user-fullname text-center text-uppercase'>
            {fullName}
          </h3>
          <div className='user-info'>
            <ul className='user-info__list p-0 m-0'>{infoUserList}</ul>
          </div>
        </>
      )}
    </div>
  )
}

export default MyProfile
