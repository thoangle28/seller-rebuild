import {useState, useEffect, useRef} from 'react'
import MyProfile from 'Components/Common/MyProfile'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import {useFormik} from 'formik'
import {Link} from 'react-router-dom'
import SettingsProfileSchema, {ResetPasswordSchema} from './Schema'
import uploadBrandIcon from './../../../app/Images/icons/upload-brand.svg'

import './style.scss'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import PopupUpdateProfileSuccess from 'Components/Common/PopupUpdateProfileSuccess'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'

const AccountSettings = () => {
  const [checkCommunicationsEmail, setCheckCommunicationsEmail] =
    useState<boolean>(true)
  const [checkCommunicationsPhone, setCheckCommunicationsPhone] =
    useState<boolean>(false)
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false)
  const [showPopupUpdateProfile, setShowPopupUpdateProfile] =
    useState<boolean>(false)

  const popupUpdateProfileRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupUpdateProfileRef, () => {
    setShowPopupUpdateProfile(false)
  })

  useEffect(() => {
    const id = setTimeout(() => setShowPopupUpdateProfile(false), 3000)

    return () => clearTimeout(id)
  }, [showPopupUpdateProfile])

  // Formik settings profile
  const {
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
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
    onSubmit: async (values) => {
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.scrollTo({top: 0, behavior: 'smooth'})
      setShowPopupUpdateProfile(true)
    },
  })

  // Formik reset password
  const {
    errors: errorsUpdatePwd,
    touched: touchedUpdatePwd,
    isSubmitting: isSubmittingUpdatePwd,
    handleBlur: handleBlurUpdatePwd,
    handleChange: handleChangeUpdatePwd,
    handleSubmit: handleSubmitUpdatePwd,
    setFieldTouched: setFieldTouchedUpdatePwd,
    setErrors: setErrorsUpdatePwd,
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.scrollTo({top: 0, behavior: 'smooth'})
      setShowPopupUpdateProfile(true)
    },
  })

  // Data reset password
  const dataResetPassword = [
    {
      name: 'currentPassword',
      type: 'password',
      title: 'Current Password',
      textError: errorsUpdatePwd.currentPassword,
      isError:
        errorsUpdatePwd.currentPassword && touchedUpdatePwd.currentPassword,
    },
    {
      name: 'newPassword',
      type: 'password',
      title: 'New Password',
      textError: errorsUpdatePwd.newPassword,
      isError: errorsUpdatePwd.newPassword && touchedUpdatePwd.newPassword,
    },
    {
      name: 'confirmNewPassword',
      type: 'password',
      title: 'Confirm New Password',
      textError: errorsUpdatePwd.confirmNewPassword,
      isError:
        errorsUpdatePwd.confirmNewPassword &&
        touchedUpdatePwd.confirmNewPassword,
    },
  ]

  // Render data reset password
  const resetPasswordList = dataResetPassword.map((item) => (
    <div className='pwd-field d-flex flex-column pb-2' key={item.title}>
      <h3 className='pwd-field__title text-capitalize m-0'>{item.title}</h3>
      <input
        type={item.type}
        name={item.name}
        className='pwd-field__input w-100 mt-2'
        onChange={(e) => {
          handleChangeUpdatePwd(e)
          setFieldTouchedUpdatePwd(item.name, false, false)
        }}
        onBlur={handleBlurUpdatePwd}
      />
      {item.isError && <p className='m-0 pwd-text-error'>{item.textError}</p>}
    </div>
  ))

  const handleShowResetPassword = () => {
    setShowResetPassword(!showResetPassword)
    setErrorsUpdatePwd({})
  }

  return (
    <DefaultLayout>
      <section className='account-settings'>
        <h2 className='settings__title mb-3 text-capitalize'>
          Account Settings
        </h2>

        <div className='settings-content d-flex align-align-items-stretch'>
          {/* My Profile */}
          <MyProfile />

          {/* Settings */}
          <div className='settings'>
            <form onSubmit={handleSubmit}>
              <div className='settings__heading pb-3 d-flex align-items-center justify-content-between'>
                {/* Navbar overview and settings */}
                <div className='settings__nav d-flex align-items-center '>
                  <Link to='/profile'>Overview</Link>
                  <h3 className='page-current m-0'>Settings</h3>
                </div>

                <ButtonPrimary type='submit' disabled={isSubmitting}>
                  Save Changes
                </ButtonPrimary>
              </div>

              <ul className='info-details__list pt-3 px-0 m-0'>
                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Brand Name
                  </h3>
                  <div className='w-100'>
                    <input
                      type='text'
                      className='info-details__input w-100'
                      name='brandName'
                      onChange={(e) => {
                        handleChange(e)
                        setFieldTouched('brandName', false, false)
                      }}
                      onBlur={handleBlur}
                    />

                    {errors.brandName && touched.brandName && (
                      <p className='m-0 pt-1 info-details-text-error'>
                        {errors.brandName}
                      </p>
                    )}
                  </div>
                </li>

                {/* Upload brand logo */}
                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Brand Logo
                  </h3>

                  <div className='d-flex align-items-center'>
                    <img
                      src='https://via.placeholder.com/100'
                      alt='brand logo'
                      className='info-details__brand-logo'
                    />

                    <input
                      type='file'
                      id='upload-brand-logo'
                      className='d-none'
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

                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Full Name
                  </h3>
                  <div className='info-details__input-row'>
                    <div className='w-100'>
                      <input
                        type='text'
                        className='info-details__input w-100'
                        name='firstName'
                        onChange={(e) => {
                          handleChange(e)
                          setFieldTouched('firstName', false, false)
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.firstName && touched.firstName ? (
                        <p className='m-0 pt-1 info-details-text-error'>
                          {errors.firstName}
                        </p>
                      ) : null}
                    </div>
                    <div className='w-100'>
                      <input
                        type='text'
                        className='info-details__input w-100'
                        name='lastName'
                        onChange={(e) => {
                          handleChange(e)
                          setFieldTouched('lastName', false, false)
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName ? (
                        <p className='m-0 pt-1 info-details-text-error'>
                          {errors.lastName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>

                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Contact Phone
                  </h3>
                  <div className='w-100'>
                    <input
                      type='text'
                      className='info-details__input w-100'
                      name='contactPhone'
                      onChange={(e) => {
                        handleChange(e)
                        setFieldTouched('contactPhone', false, false)
                      }}
                      onBlur={handleBlur}
                    />

                    {errors.contactPhone && touched.contactPhone && (
                      <p className='m-0 info-details-text-error'>
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>
                </li>

                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Contact Email
                  </h3>
                  <div className='w-100'>
                    <input
                      type='email'
                      className='info-details__input w-100'
                      name='contactEmail'
                      onChange={(e) => {
                        handleChange(e)
                        setFieldTouched('contactEmail', false, false)
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.contactEmail && touched.contactEmail && (
                      <p className='m-0 pt-1 info-details-text-error'>
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>
                </li>

                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Address
                  </h3>
                  <div className='w-100'>
                    <input
                      type='text'
                      className='info-details__input w-100'
                      name='address'
                      onChange={(e) => {
                        handleChange(e)
                        setFieldTouched('address', false, false)
                      }}
                      onBlur={handleBlur}
                    />

                    {errors.address && touched.address && (
                      <p className='m-0 pt-1 info-details-text-error'>
                        {errors.address}
                      </p>
                    )}
                  </div>
                </li>

                {/* Check box ommunications */}
                <li className='info-details__item pb-3 w-100 d-flex align-items-center'>
                  <h3 className='info-details__title m-0 text-capitalize'>
                    Communications
                  </h3>

                  <div className='info-details__input-checkbox-wrap d-flex me-3'>
                    <input
                      type='checkbox'
                      className='info-details__input w-100 me-3'
                      id='checkbox-email'
                      checked={checkCommunicationsEmail}
                      onChange={() =>
                        setCheckCommunicationsEmail(!checkCommunicationsEmail)
                      }
                    />
                    <label htmlFor='checkbox-email'>Email</label>
                  </div>
                  <div className='info-details__input-checkbox-wrap d-flex'>
                    <input
                      type='checkbox'
                      className='info-details__input w-100 me-3'
                      id='checkbox-phone'
                      checked={checkCommunicationsPhone}
                      onChange={() =>
                        setCheckCommunicationsPhone(!checkCommunicationsPhone)
                      }
                    />
                    <label htmlFor='checkbox-phone'>Phone</label>
                  </div>
                </li>
              </ul>
            </form>
          </div>

          <div className='signin-method ms-3'>
            <h2 className='signin-method__title mb-3  pb-3 text-capitalize'>
              Sign-in Method
            </h2>

            <form onSubmit={handleSubmitUpdatePwd}>
              {showResetPassword ? (
                <>
                  {resetPasswordList}

                  {/* Note password */}
                  <div className='pwd-note d-flex flex-column'>
                    <h3 className='m-0 pb-2'>Note:</h3>
                    <span className='w-100 d-inline-block'>
                      Password must be at least 3 characters, including: one
                      uppercase, one lowercase, one number and one special case
                      character.
                    </span>
                  </div>
                </>
              ) : (
                <div className='mt-3'>
                  <h3 className='signin-method__password'>Password</h3>
                  <span className='signin-method__password-current'>
                    ********
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className='signin-method-actions d-flex align-items-center'>
                {showResetPassword ? (
                  <>
                    <span className='me-3' onClick={handleShowResetPassword}>
                      Cancel
                    </span>
                    <ButtonPrimary
                      disabled={isSubmittingUpdatePwd}
                      type='submit'>
                      Update Password
                    </ButtonPrimary>
                  </>
                ) : (
                  <ButtonPrimary onClick={handleShowResetPassword}>
                    Reset Password
                  </ButtonPrimary>
                )}
              </div>
            </form>
          </div>

          {/* Popup update success */}
          {showPopupUpdateProfile && (
            <div className='update-success-overlay d-flex align-items-center justify-content-center'>
              <div className='update-success-wrap' ref={popupUpdateProfileRef}>
                <PopupUpdateProfileSuccess />
              </div>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  )
}

export default AccountSettings
