import {useRef, useState, useEffect} from 'react'
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
import PopupUpdateProfileSuccess from '../PopupUpdateProfileSuccess'
import {useNavigate} from 'react-router-dom'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import {
  changeAvatar,
  deleteMessage,
  getInfoUser,
} from 'Components/Pages/Profile/Redux/actions'

interface Props {
  data: any
  isLoading: boolean
}

const MyProfile = (props: Props) => {
  const {data, isLoading} = props

  const [avatarUser, setAvatarUser] = useState<string>('')

  const dispatch = useAppDispatch()

  const {user, accessToken} = useAppSelector((state) => state.loginReducer)
  const {user_login, ID, user_email} = user
  const getInfoUserPayload = {
    user_id: ID,
    user_email: user_email,
  }

  const {
    brand,
    firstname,
    lastname,
    personal_photo,
    contactEmail,
    contactPhone,
    address,
    communications,
  } = data

  const {isSuccessChangeAvatar, isLoadingChangeAvatar, message} =
    useAppSelector((state) => state.profileReducer)

  const fullName = `${firstname} ${lastname}`

  const userInfo = [
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
      text: address || 'Not Found',
    },
    {
      icon: faPhoneFlip,
      text: contactPhone || 'Not Found',
    },
  ]

  const popupRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useOnClickOutside(popupRef, () => {
    dispatch(deleteMessage())
    setAvatarUser('')
    dispatch(getInfoUser(getInfoUserPayload))
  })

  if (isSuccessChangeAvatar && message) {
    setTimeout(() => {
      dispatch(deleteMessage())
      setAvatarUser('')
      dispatch(getInfoUser(getInfoUserPayload))
    }, 3000)
  }

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
        brand: {id: brand?.id, name: brand?.name, logo: ''},
        communications: {
          email: communications?.email,
          phone: communications?.phone,
        },
        firstname,
        lastname,
        address,
        contactPhone,
      },
      userInfo: {
        userEmail: user_login,
        accessToken: accessToken,
      },
    }
    dispatch(changeAvatar(changeAvatarPayload))
  }

  // Render list info
  const userInfoList = userInfo.map((item, index) => (
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
      {isLoading || isLoadingChangeAvatar ? (
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
                <span className='text-white fw-medium'>Save avatar</span>
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
            <ul
              className={`user-info__list p-0 ${
                !avatarUser ? 'user-info__list--not-change-avt' : ''
              }`}>
              {userInfoList}
            </ul>
          </div>
        </>
      )}

      {/* Popup update success */}
      {isSuccessChangeAvatar && message && (
        <div className='update-success-overlay d-flex align-items-center justify-content-center'>
          <div className='update-success-wrap' ref={popupRef}>
            <PopupUpdateProfileSuccess
              message='Your profile has been updated successfully'
              textButton='General View'
              onClickButton={() => {
                navigate('/my-profile')
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProfile
