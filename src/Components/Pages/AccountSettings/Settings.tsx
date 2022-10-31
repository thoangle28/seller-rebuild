import {useFormik} from 'formik'
import {memo, useState} from 'react'
import {Link} from 'react-router-dom'
import {SettingsProfileSchema} from './Schema'
import uploadBrandIcon from './../../../app/Images/icons/upload-brand.svg'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import './style.scss'

const Settings = () => {
  const [checkCommunicationEmail, setCheckCommunicationEmail] =
    useState<boolean>(true)
  const [checkCommunicationPhone, setCheckCommunicationPhone] =
    useState<boolean>(false)

  const profile = JSON.parse(localStorage.getItem('persist:profile') || '{}')
  const {accessToken} = profile

  const handleSubmitForm = (values: any) => {
    const editInfoUserPayload = {
      profile: {
        email: 'voquang1406@gmail.com',
        personal_photo:
          'https://addin-sg.lotustest.net/wp-content/uploads/2022/10/444f3a8d23604155c229a647b5abd715-1-scaled.jpeg',
        new_personal_photo: '',
        avatar:
          'https://addin-sg.lotustest.net/wp-content/uploads/2022/10/b097d821d2a51b096e19edad77269b45-1.jpeg',
        new_avatar:
          'https://addin-sg.lotustest.net/wp-content/uploads/2022/10/b097d821d2a51b096e19edad77269b45-1.jpeg',
        firstname: values.firstName,
        lastname: values.lastName,
        company: 'lotus',
        brand: {
          id: 3872,
          name: 'lotus',
          logo: '',
        },
        contactPhone: values.contactPhone,
        contactEmail: values.contactEmail,
        address: values.address,
        country: '',
        language: '',
        timeZone: '',
        currency: '',
        communications: {
          email: checkCommunicationEmail,
          phone: checkCommunicationPhone,
        },
        allowMarketing: false,
      },
      userInfo: {
        userEmail: 'voquang1406@gmail.com',
        accessToken: accessToken,
      },
    }
  }
  const {
    errors,
    values,
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
    onSubmit: handleSubmitForm,
  })

  return (
    <div className='settings'>
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
                value={values.brandName}
                className='settings-details__input w-100'
                name='brandName'
                onChange={(e) => {
                  handleChange(e)
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
                src='https://via.placeholder.com/100'
                alt='brand logo'
                className='settings-details__brand-logo'
              />

              <input type='file' id='upload-brand-logo' className='d-none' />
              <label
                htmlFor='upload-brand-logo'
                className='upload-brand__label d-flex align-items-center'>
                <img
                  src={uploadBrandIcon}
                  alt='upload-brand-icon'
                  className='upload-brand-icon'
                />
                <h3 className='upload-brand-text m-0'>Click here to change.</h3>
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
                  value={values.firstName}
                  onChange={(e) => {
                    handleChange(e)
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
                  onChange={(e) => {
                    handleChange(e)
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
                value={values.contactPhone}
                name='contactPhone'
                onChange={(e) => {
                  handleChange(e)
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
                value={values.contactEmail}
                onChange={(e) => {
                  handleChange(e)
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
                value={values.address}
                name='address'
                onChange={(e) => {
                  handleChange(e)
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
      </form>
    </div>
  )
}

export default memo(Settings)
