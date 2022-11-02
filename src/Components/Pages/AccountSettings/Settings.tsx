import {useFormik} from 'formik'
import {memo, useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {SettingsProfileSchema} from './Schema'
import uploadBrandIcon from './../../../app/Images/icons/upload-brand.svg'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import './style.scss'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import {convertBase64} from 'app/Utils'
import defaultImg from './../../../app/Images/default-img-err.jpg'
import {deleteMessage, editInfoUser} from '../Profile/Redux/actions'
import Loading from 'Components/Common/Loading'
import PopupUpdateProfileSuccess from 'Components/Common/PopupUpdateProfileSuccess'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'

const Settings = () => {
  const {user, accessToken} = useAppSelector((state) => state.loginReducer)
  const {user_login} = user

  const {infoUser, isLoading, isFailure, isSuccess, message} = useAppSelector(
    (state) => state.profileReducer
  )

  useEffect(() => {
    return () => {
      dispatch(deleteMessage())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValues({
      firstName: firstname as string,
      lastName: lastname as string,
      brandName: brand?.name as string,
      contactEmail: contactEmail as string,
      contactPhone: contactPhone as string,
      address: address as string,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => {
    navigate('/my-profile')
  })

  if (isSuccess && message) {
    setTimeout(() => {
      navigate('/my-profile')
    }, 3000)
  }

  const navigate = useNavigate()

  const {
    brand,
    firstname,
    lastname,
    contactEmail,
    contactPhone,
    address,
    communications,
  } = infoUser

  const [brandLogo, setBrandLogo] = useState<string>('')
  const [checkCommunicationEmail, setCheckCommunicationEmail] =
    useState<boolean>(communications?.email || true)
  const [checkCommunicationPhone, setCheckCommunicationPhone] =
    useState<boolean>(communications?.phone || false)

  const dispatch = useAppDispatch()

  const handleUploadLogo = async (e: any) => {
    const file = e.target.files[0]

    try {
      const base64: any = await convertBase64(file)
      setBrandLogo(base64)
    } catch (error) {}
  }

  const handleSubmitForm = (values: any) => {
    dispatch(deleteMessage())
    const editInfoUserPayload = {
      profile: {
        firstname: values.firstName,
        lastname: values.lastName,
        brand: {
          name: values.brandName,
          logo: brandLogo,
        },
        contactPhone: values.contactPhone,
        contactEmail: values.contactEmail,
        address: values.address,
        communications: {
          email: checkCommunicationEmail,
          phone: checkCommunicationPhone,
        },
      },
      userInfo: {
        userEmail: user_login,
        accessToken: accessToken,
      },
    }

    dispatch(editInfoUser(editInfoUserPayload))
  }

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setSubmitting,
    setFieldTouched,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      brandName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
    },
    validationSchema: SettingsProfileSchema,
    onSubmit: handleSubmitForm,
  })

  return (
    <div className='settings'>
      {isLoading ? (
        <div className='py-4'>
          <Loading />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='settings__heading d-flex align-items-center justify-content-between'>
            {/* Navbar overview and settings */}
            <div className='settings__nav d-flex align-items-center '>
              <Link to='/my-profile'>Overview</Link>
              <h3 className='page-current m-0'>Settings</h3>
            </div>

            <ButtonPrimary type='submit' disabled={isSubmitting}>
              Save Changes
            </ButtonPrimary>
          </div>

          <ul className='settings-details__list p-0 m-0'>
            <li className='settings-details__item w-100 d-flex'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Brand Name
              </h3>

              <div className='settings-details__input-wrap'>
                <input
                  type='text'
                  value={values.brandName || ''}
                  className='settings-details__input w-100'
                  name='brandName'
                  onChange={(e) => {
                    handleChange(e)
                    setSubmitting(false)
                    setFieldTouched('brandName', false, false)
                  }}
                  onBlur={handleBlur}
                />

                {errors.brandName && touched.brandName && (
                  <p className='m-0 settings-details__text-error text-danger'>
                    {errors.brandName}
                  </p>
                )}
              </div>
            </li>

            {/* Upload brand logo */}
            <li className='settings-details__item w-100 d-flex'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Brand Logo
              </h3>

              <div className='d-flex align-items-center'>
                <img
                  src={brandLogo || brand?.logo || defaultImg}
                  alt='brand logo'
                  className='settings-details__brand-logo'
                />

                <input
                  type='file'
                  id='upload-brand-logo'
                  className='d-none'
                  onChange={handleUploadLogo}
                />
                <label
                  htmlFor='upload-brand-logo'
                  className='upload-brand__label d-flex align-items-center'>
                  <img
                    src={uploadBrandIcon}
                    alt='upload-brand-icon'
                    className='upload-brand-icon'
                  />
                  <h3 className='upload-brand-text m-0'>
                    Click here to change.
                  </h3>
                </label>
              </div>
            </li>

            <li className='settings-details__item w-100 d-flex align-items-center'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Full Name
              </h3>
              <div className='settings-details__input-row'>
                <div className='settings-details__input-wrap'>
                  <input
                    type='text'
                    className='settings-details__input w-100'
                    name='firstName'
                    value={values.firstName || ''}
                    onChange={(e) => {
                      handleChange(e)
                      setSubmitting(false)
                      setFieldTouched('firstName', false, false)
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className='m-0 pt-1 settings-details__text-error text-danger'>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className='settings-details__input-wrap'>
                  <input
                    type='text'
                    className='settings-details__input w-100'
                    name='lastName'
                    value={values.lastName || ''}
                    onChange={(e) => {
                      handleChange(e)
                      setSubmitting(false)
                      setFieldTouched('lastName', false, false)
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className='m-0 pt-1 settings-details__text-error text-danger'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </li>

            <li className='settings-details__item w-100 d-flex align-items-center'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Contact Phone
              </h3>
              <div className='settings-details__input-wrap'>
                <input
                  type='text'
                  className='settings-details__input w-100'
                  value={values.contactPhone || ''}
                  name='contactPhone'
                  onChange={(e) => {
                    handleChange(e)
                    setSubmitting(false)
                    setFieldTouched('contactPhone', false, false)
                  }}
                  onBlur={handleBlur}
                />

                {errors.contactPhone && touched.contactPhone && (
                  <p className='m-0 pt-1 settings-details__text-error text-danger'>
                    {errors.contactPhone}
                  </p>
                )}
              </div>
            </li>

            <li className='settings-details__item w-100 d-flex align-items-center'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Contact Email
              </h3>
              <div className='settings-details__input-wrap'>
                <input
                  type='text'
                  className='settings-details__input w-100'
                  name='contactEmail'
                  value={values.contactEmail || ''}
                  onChange={(e) => {
                    handleChange(e)
                    setSubmitting(false)
                    setFieldTouched('contactEmail', false, false)
                  }}
                  onBlur={handleBlur}
                />
                {errors.contactEmail && touched.contactEmail && (
                  <p className='m-0 pt-1 settings-details__text-error text-danger'>
                    {errors.contactEmail}
                  </p>
                )}
              </div>
            </li>

            <li className='settings-details__item w-100 d-flex align-items-center'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Address
              </h3>
              <div className='settings-details__input-wrap'>
                <input
                  type='text'
                  className='settings-details__input w-100'
                  value={values.address || ''}
                  name='address'
                  onChange={(e) => {
                    handleChange(e)
                    setSubmitting(false)
                    setFieldTouched('address', false, false)
                  }}
                  onBlur={handleBlur}
                />

                {errors.address && touched.address && (
                  <p className='m-0 pt-1 settings-details__text-error text-danger'>
                    {errors.address}
                  </p>
                )}
              </div>
            </li>

            {/* Check box ommunications */}
            <li className='settings-details__item w-100 d-flex align-items-center'>
              <h3 className='settings-details__title m-0 text-capitalize'>
                Communications
              </h3>

              <div className='settings-details__input-checkbox-wrap d-flex me-3'>
                <input
                  type='checkbox'
                  className='settings-details__input w-100 me-3'
                  id='checkbox-email'
                  checked={checkCommunicationEmail}
                  onChange={() =>
                    setCheckCommunicationEmail(!checkCommunicationEmail)
                  }
                />
                <label htmlFor='checkbox-email'>Email</label>
              </div>
              <div className='settings-details__input-checkbox-wrap d-flex'>
                <input
                  type='checkbox'
                  className='settings-details__input w-100 me-3'
                  id='checkbox-phone'
                  checked={checkCommunicationPhone}
                  onChange={() =>
                    setCheckCommunicationPhone(!checkCommunicationPhone)
                  }
                />
                <label htmlFor='checkbox-phone'>Phone</label>
              </div>
            </li>
          </ul>
          {isFailure && message && (
            <p className='pt-4 m-0 text-danger text-center'>{message}</p>
          )}

          {/* Popup update success */}
          {isSuccess && message && (
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
        </form>
      )}
    </div>
  )
}

export default memo(Settings)
