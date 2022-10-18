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
type Props = {}
const SignUp = (props: Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [checkAcceptTerms, setCheckAcceptTerms] = useState<boolean>(false)

  const modalRef = useRef<HTMLDivElement>(null)

  const {isFailure, message} = useAppSelector((state) => state.registerReducer)

  useOnClickOutside(modalRef, () => {
    setShowPopup(false)
  })

  const dispatch = useAppDispatch()

  const {
    errors,
    touched,
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
      type: 'text',
      textError: errors.firstname,
      isError: errors.firstname && touched.firstname,
    },
    {
      name: 'lastname',
      id: 'lastname',
      label: 'Last Name *',
      type: 'text',
      textError: errors.lastname,
      isError: errors.lastname && touched.lastname,
    },
    {
      name: 'brand',
      id: 'brand',
      label: 'Brand Name *',
      type: 'text',
      textError: errors.brand,
      isError: errors.brand && touched.brand,
    },
    {
      name: 'email',
      id: 'email',
      label: 'Email *',
      type: 'email',
      textError: errors.email,
      isError: errors.email && touched.email,
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password *',
      type: 'password',
      textError: errors.password,
      isError: errors.password && touched.password,
    },
    {
      name: 'confirmPassword',
      id: 'confirmPassword',
      label: 'Confirm Password *',
      type: 'password',
      textError: errors.confirmPassword,
      isError: errors.confirmPassword && touched.confirmPassword,
    },
  ]
  // Render list input
  const inputFieldList = inputFields.map((item) => {
    return (
      <div className='form__input-col' key={item.id}>
        <InputField
          id={item.id}
          name={item.name}
          label={item.label}
          type={item.type}
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

  const dataModal = [
    {
      title: '1. General',
      body: [
        '1.1 These Terms & Conditions apply when you access and/or use www.addin.sg (the “Website”), which is operated by AddIn (“us”, “we”, “our”).',
        '1.2 You should read these Terms & Conditions, and the Privacy Policy very carefully. The Privacy Policy is incorporated into these Terms & Conditions by reference. By accessing and/or using the Website or any part of it, you agree that you have read these Terms & Conditions and that you accept them and agree to be bound by them.',
        '1.3 We may also, from time to time, post on the Website, guidelines and rules relating to the use of the Website. All such guidelines or rules are hereby incorporated by reference into these Terms & Conditions.',
        '1.4 You agree that we may modify these Terms & Conditions without liability and without prior notice to you. The modified Terms & Conditions will be posted on the Website and will come into effect from the date of such posting. You are advised to check for updates to these Terms & Conditions regularly, prior to accessing and/or using the Website.',
      ],
    },
    {
      title: '2. Territory',
      body: [
        '2.1 The information on the Website is directed solely at persons accessing the Website from Singapore. We make no representation that any product or service referred to on the Website is available, or appropriate for use for any other location.',
      ],
    },
  ]

  // Render list list Modal
  const modalList = dataModal.map((item) => (
    <div className='modal__content' key={item.title}>
      <h3 className='modal__content-title'>{item.title}</h3>
      {item.body.map((item, index) => (
        <p className='modal__content-body' key={index}>
          {item}
        </p>
      ))}
    </div>
  ))

  const handleShowPopup = () => {
    setShowPopup(true)
  }

  const handleCheckAcceptTerms = () => {
    setCheckAcceptTerms(!checkAcceptTerms)
  }

  const renderMessage = (message: string) => {
    if (!message) return <></>
    return (
      <p
        className={`text-center text-${
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
          <div className='form__input-wrap'>
            <div className='form__input-wrap-field'>{inputFieldList}</div>
          </div>
          <div className='form__check-terms mt-3'>
            <input
              type='checkbox'
              name='remember-pwd'
              id='remember-pwd'
              checked={checkAcceptTerms}
              onChange={handleCheckAcceptTerms}
            />
            <label className='ms-3 cursor m-0' htmlFor='remember-pwd'>
              I agree to the
              <p onClick={handleShowPopup} className='m-0 text-primary'>
                &nbsp;terms and conditions.
              </p>
              <span className='text-danger'> *</span>
            </label>
          </div>
          {renderMessage(message)}
          <ButtonSubmitForm disabled={!checkAcceptTerms}>
            Submit
          </ButtonSubmitForm>
        </FormWrapper>
      </form>
      {showPopup ? (
        <div className='overlay d-flex justify-content-center align-items-center'>
          <div className='modal-terms' ref={modalRef}>
            <h3 className='modal__heading text-center m-0'>
              Terms and Conditions
            </h3>
            <h4 className='modal__sub-heading text-center mt-1'>Our Policy</h4>
            <div className='modal__content-wrap'>{modalList}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </FullWidthLayout>
  )
}
export default SignUp
