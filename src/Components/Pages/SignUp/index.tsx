import {useFormik} from 'formik'
import {Link} from 'react-router-dom'

import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import FormWrapper from 'Components/Common/FormWrapper'
import InputField from 'Components/Common/InputField'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'

import './style.scss'
import SignUpSchema from './Schema'

type Props = {}

const SignUp = (props: Props) => {
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
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const data = [
    {
      name: 'firstName',
      id: 'firstName',
      label: 'First Name *',
      type: 'text',
      textError: errors.firstName,
      isError: errors.firstName && touched.firstName,
    },
    {
      name: 'lastName',
      id: 'lastName',
      label: 'Last Name *',
      type: 'text',
      textError: errors.lastName,
      isError: errors.lastName && touched.lastName,
    },
    {
      name: 'brandName',
      id: 'brandName',
      label: 'Brand Name *',
      type: 'text',
      textError: errors.brandName,
      isError: errors.brandName && touched.brandName,
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
  const inputFieldList = data.map((item) => {
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

  return (
    <FullWidthLayout>
      <form className='form-sign-up' onSubmit={handleSubmit}>
        <FormWrapper formTitle='SIGN IN TO SELLER PORTAL' backPageLogin>
          <h4 className='form-sub-title text-center'>
            <span>Already have an account, </span>
            <Link to='/login' className='text-decoration-none'>
              click here to login.
            </Link>
          </h4>

          <div className='form__input-wrap'>
            <div className='form__input-wrap-field'>{inputFieldList}</div>
          </div>

          <div className='form__check-terms'>
            <input type='checkbox' name='remember-pwd' id='remember-pwd' />
            <label className='ms-3' htmlFor='remember-pwd'>
              I agree to the{' '}
              <span>
                terms and conditions. <span>*</span>
              </span>
            </label>
          </div>

          <ButtonSubmitForm disabled={isSubmitting}>Submit</ButtonSubmitForm>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}

export default SignUp
