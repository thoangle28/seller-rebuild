import {useState, useRef} from 'react'
import {useFormik} from 'formik'
import {Link} from 'react-router-dom'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import FormWrapper from 'Components/Common/FormWrapper'
import InputField from 'Components/Common/InputField'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import './style.scss'
import SignUpSchema from './Schema'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import {useAppDispatch, useAppSelector} from './../../../app/Hooks/hooks'
import {register} from './Redux/action'
import {dataModal} from 'app/Constants'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import Loading from 'Components/Common/Loading'
type Props = {}
const SignUp = (props: Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [checkAcceptTerms, setCheckAcceptTerms] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const {isFailure, message, isLoading} = useAppSelector(
    (state) => state.registerReducer
  )
  useOnClickOutside(modalRef, () => {
    setShowPopup(false)
  })
  const dispatch = useAppDispatch()
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      brand: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      dispatch(register(values))
    },
  })
  const inputFields = [
    {
      name: 'firstname',
      id: 'firstname',
      label: 'First Name *',
      value: values.firstname,
      type: 'text',
      textError: errors.firstname,
      isError: errors.firstname && touched.firstname,
    },
    {
      name: 'lastname',
      id: 'lastname',
      label: 'Last Name *',
      value: values.lastname,
      type: 'text',
      textError: errors.lastname,
      isError: errors.lastname && touched.lastname,
    },
    {
      name: 'brand',
      id: 'brand',
      label: 'Brand Name *',
      value: values.brand,
      type: 'text',
      textError: errors.brand,
      isError: errors.brand && touched.brand,
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email *',
      value: values.email,
      type: 'text',
      textError: errors.email,
      isError: errors.email && touched.email,
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password *',
      value: values.password,
      type: 'password',
      textError: errors.password,
      isError: errors.password && touched.password,
    },
    {
      name: 'confirmPassword',
      id: 'confirmPassword',
      label: 'Confirm Password *',
      value: values.confirmPassword,
      type: 'password',
      textError: errors.confirmPassword,
      isError: errors.confirmPassword && touched.confirmPassword,
    },
  ]
  const handleShowPopup = () => {
    setShowPopup(!showPopup)
  }
  const handleCheckAcceptTerms = () => {
    setCheckAcceptTerms(!checkAcceptTerms)
  }
  // Render popup terms and service
  const renderPopupTermsAndServices = () => {
    return (
      <>
        {showPopup && (
          <div className='overlay d-flex justify-content-center align-items-center'>
            <div className='modal__terms' ref={modalRef}>
              <h3 className='modal__heading text-center m-0'>
                Terms and Conditions
              </h3>
              <h4 className='modal__sub-heading text-center mt-1'>
                Our Policy
              </h4>
              <div className='modal__content-wrap'>{modalList}</div>
              <FontAwesomeIcon
                className='modal__close-icon'
                onClick={handleShowPopup}
                icon={faXmark}
              />
            </div>
          </div>
        )}
      </>
    )
  }
  // Render list input
  const inputFieldList = inputFields.map((item) => {
    return (
      <div className='form__input-col' key={item.id}>
        <InputField
          id={item.id}
          name={item.name}
          label={item.label}
          type={item.type}
          value={item.value}
          textError={item.textError}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e)
            setFieldTouched(item.name, false, false)
          }}
          isError={item.isError ? true : false}
        />
      </div>
    )
  })
  // Render list list Modal
  const modalList = dataModal.map((item, index) => (
    <div className='modal__content' key={item.title}>
      <h3 className='modal__content-title'>{item.title}</h3>
      {item.body.map((item, index) => (
        <p className='modal__content-body' key={index}>
          {item}
        </p>
      ))}
      {item.img &&
        item.img.map((img, index) => (
          <img src={img} className='pb-4' alt='Modal terms' key={index} />
        ))}
    </div>
  ))
  const renderMessage = (message: string) => {
    if (!message) return <></>
    return (
      <p
        className={`signup__text-error text-center text-${
          isFailure ? 'danger' : 'success'
        } mt-1 mb-1`}>
        {message}
      </p>
    )
  }
  return (
    <FullWidthLayout>
      <form className='form-sign-up' onSubmit={handleSubmit}>
        <FormWrapper formTitle='CREATE NEW ACCOUNT' backPageLogin>
          <h4 className='form-sub-title text-center'>
            <span>Already have an account, </span>
            <Link to='/' className='text-decoration-none text-primary'>
              click here to login.
            </Link>
          </h4>
          {isLoading ? (
            <div className='py-3'>
              <Loading />
            </div>
          ) : (
            <>
              <div className='form__input-wrap'>
                <div className='form__input-wrap-field'>{inputFieldList}</div>
              </div>
              <label className='check__terms mt-3 d-flex align-items-center'>
                <label className='cursor m-0 d-flex' htmlFor='remember-pwd'>
                  I agree to the
                  <p onClick={handleShowPopup} className='m-0 text-primary'>
                    &nbsp;terms and conditions.
                  </p>
                  <span className='text-danger'> *</span>
                </label>
                <input
                  type='checkbox'
                  name='remember-pwd'
                  id='remember-pwd'
                  checked={checkAcceptTerms}
                  onChange={handleCheckAcceptTerms}
                />
                <span className='checkmark'>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>
              {renderMessage(message)}
            </>
          )}
          <ButtonSubmitForm disabled={!checkAcceptTerms}>
            Continue
          </ButtonSubmitForm>
        </FormWrapper>
      </form>
      {renderPopupTermsAndServices()}
    </FullWidthLayout>
  )
}
export default SignUp
