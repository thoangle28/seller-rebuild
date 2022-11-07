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
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import changeAvatarIcon from './../../../app/Images/icons/upload-avatar-icon.svg'
import deleteChangeAvatarIcon from './../../../app/Images/icons/delete-upload-icon.jpg'
import {changeAvatar} from './Redex/actions'

interface Props {
  data: any
  isLoading: boolean
}

const MyProfile = (props: Props) => {
  const {data, isLoading} = props

  const [avatarUser, setAvatarUser] = useState<string>('')

  const dispatch = useAppDispatch()

  const {user, accessToken} = useAppSelector((state) => state.loginReducer)
  const {user_login} = user

  const {
    firstname,
    lastname,
    personal_photo,
    contactEmail,
    contactPhone,
    address,
  } = data
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

  const handleRemoveAvatar = () => {
    setAvatarUser('')
  }

  const handleSaveAvatar = () => {
    const changeAvatarPayload = {
      profile: {
        personal_photo: personal_photo || '',
        new_personal_photo: avatarUser,
      },
      userInfo: {
        userEmail: user_login,
        accessToken: accessToken,
      },
    }
    dispatch(changeAvatar(changeAvatarPayload))
  }

  // Render list info
  const infoUserList = infoUser.map((item, index) => (
    <li className='user-info__item' key={index}>
      <span className='user-info__icon d-inline-block'>
        <FontAwesomeIcon icon={item.icon} />
      </span>
      <span
        className={`user-info__text d-inline-block w ${
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
            {personal_photo || avatarUser ? (
              <img src={avatarUser || personal_photo} alt='avatar' />
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
                <div className='upload-img'>
                  <img src={uploadIcon} alt='upload icon' />
                  <div></div>
                </div>
              </label>
            </div>
          </div>
          <h3 className='user-fullname text-center text-uppercase mb-4'>
            {fullName}
          </h3>
          {avatarUser && (
            <div className='d-flex justify-content-center mb-4'>
              <button
                className='save-avt btn btn-primary border-0 me-1 cursor-pointer d-flex align-items-center'
                onClick={handleSaveAvatar}>
                <img src={changeAvatarIcon} alt='icon save avatar' />
                <span className='text-white'>Save avatar</span>
              </button>
              <button
                className='del-save-avt border border-primary bg-transparent fw-medium'
                onClick={handleRemoveAvatar}>
                <img src={deleteChangeAvatarIcon} alt='delete' />
              </button>
            </div>
          )}
          <div
            className={`user-info ${
              !avatarUser ? 'user-info--no-avatar-change' : ''
            }`}>
            <ul className='user-info__list p-0 m-0'>{infoUserList}</ul>
          </div>
        </>
      )}
    </div>
  )
}

export default MyProfile
