import {useState, Fragment, memo, useEffect} from 'react'
import './style.scss'
import resetPwdLogo from './../../../../app/Images/icons/reset-pwd.svg'
import {useFormik} from 'formik'
import ResetPasswordSchema from './Schema'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {iChangePassword} from 'app/Models/profile.interface'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import Loading from 'Components/Common/Loading'
import PopupUpdateProfileSuccess from 'Components/Common/PopupUpdateProfileSuccess'
import {useNavigate} from 'react-router-dom'
import {logout} from 'Components/Pages/Login/Redux/action'
import {changePassword, deleteMessage} from './Redux/actions'

const SignInMethod = () => {
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const {isLoading, isFailure, isSuccess, message} = useAppSelector(
    (state) => state.resetPasswordReducer
  )

  const {user} = useAppSelector((state) => state.loginReducer)
  const {ID} = user

  const navigate = useNavigate()

  const handleShowResetPwd = () => {
    setShowResetPassword(!showResetPassword)
    resetForm()
  }

  const handleLogout = () => {
    dispatch(logout)
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    if (isSuccess && message) {
      setTimeout(() => {
        dispatch(deleteMessage())
        handleLogout()
      }, 3000)
    }
    resetForm()
  }, [isSuccess])

  // Formik reset password
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const {currentPassword, newPassword, confirmNewPassword} = values

      const changePasswordPayload: iChangePassword = {
        old_password: currentPassword,
        new_password: newPassword,
        password_confirm: confirmNewPassword,
        user_id: ID,
      }

      dispatch(changePassword(changePasswordPayload))
    },
  })

  // Data reset password
  const dataResetPassword = [
    {
      name: 'currentPassword',
      type: 'password',
      title: 'Current Password',
      value: values.currentPassword,
      textError: errors.currentPassword,
      isError: errors.currentPassword && touched.currentPassword,
    },
    {
      name: 'newPassword',
      type: 'password',
      title: 'New Password',
      value: values.newPassword,
      textError: errors.newPassword,
      isError: errors.newPassword && touched.newPassword,
    },
    {
      name: 'confirmNewPassword',
      type: 'password',
      title: 'Confirm New Password',
      value: values.confirmNewPassword,
      textError: errors.confirmNewPassword,
      isError: errors.confirmNewPassword && touched.confirmNewPassword,
    },
  ]

  const renderResetPasswordList = dataResetPassword.map(
    (item: any, index: number) => (
      <Fragment key={index}>
        <div className='signin-method__item d-flex align-items-center'>
          <h3 className='signin-method__name text-capitalize m-0'>
            {item.title}
          </h3>

          <input
            type={item.type}
            name={item.name}
            value={item.value}
            className='signin-method__input w-100'
            onChange={(e) => {
              handleChange(e)
              setFieldTouched(item.name, false, false)
              message && dispatch(deleteMessage())
            }}
            onBlur={handleBlur}
          />
        </div>

        {item.isError && (
          <p className='m-0 signin-method__text-error text-danger'>
            {item.textError}
          </p>
        )}
      </Fragment>
    )
  )

  const renderSignInMethod = () => {
    return (
      <div className='signin-method__password d-flex justify-content-between align-items-center'>
        <div>
          <h3 className='signin-method__title m-0 mb-2'>Password</h3>
          <p className='signin-method__pwd m-0'>********</p>
        </div>
        <button
          className='signin-method__btn d-flex align-items-center'
          onClick={handleShowResetPwd}>
          <img src={resetPwdLogo} alt='reset password' />
          <span className='text-capitalize'>Reset Password</span>
        </button>
      </div>
    )
  }

  const renderResetPassword = () => {
    return isLoading ? (
      <Loading />
    ) : (
      <form onSubmit={handleSubmit} className='d-flex justify-content-between'>
        <div className='signin-method__left mx-auto'>
          {renderResetPasswordList}
          {isFailure && message && (
            <p className='text-danger pt-3 text-center signin-method__message-error'>
              {message}
            </p>
          )}
        </div>

        <div className='signin-method__right d-flex flex-column ms-3'>
          <div className='signin-method__right-top'>
            <h3 className='m-0 mb-2'>Note:</h3>
            <p className='text-danger m-0'>
              Password must be at least 8 characters, including: one uppercase,
              one lowercase, one number and one special case character.
            </p>
          </div>

          <div className='signin-method__right-actions d-flex justify-content-end align-items-center'>
            <h3 className='me-3 m-0' onClick={handleShowResetPwd}>
              Cancel
            </h3>
            <ButtonPrimary
              disabled={isLoading || (isSuccess && message)}
              type='submit'
              className='btn-update-pwd'>
              Update Password
            </ButtonPrimary>
          </div>
        </div>
      </form>
    )
  }

  return (
    <>
      <div className='signin-method mt-4'>
        <h2 className='account-settings__title mb-3'>Sign-in Method</h2>

        <div className='signin-method__content p-4'>
          {showResetPassword ? renderResetPassword() : renderSignInMethod()}
        </div>
      </div>
      {/* Popup update success */}
      {isSuccess && message && (
        <div className='update-success-overlay d-flex align-items-center justify-content-center'>
          <div className='update-success-wrap'>
            <PopupUpdateProfileSuccess
              message={message}
              textButton='Sign Out'
              onClickButton={handleLogout}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default memo(SignInMethod)
