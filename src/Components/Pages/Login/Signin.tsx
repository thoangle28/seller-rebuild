import {FC} from 'react'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import FormWrapper from 'Components/Common/FormWrapper'
import {Link} from 'react-router-dom'
import './style.scss'
import InputField from 'Components/Common/InputField'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import LoginSchema from './Schema/index'
interface Props {
  ex?: string
}

const Signin: FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
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
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const data = [
    {
      name: 'email',
      id: 'email',
      label: 'Email/Username',
      type: 'email',
      textError: errors.email,
      isError: errors.email && touched.email,
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password',
      type: 'password',
      textError: errors.password,
      isError: errors.password && touched.password,
    },
  ]

  // Render list input
  const inputFieldList = data.map((item) => {
    return (
      <InputField
        key={item.id}
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
    )
  })

  return (
    <FullWidthLayout>
      <form className='form-login' onSubmit={handleSubmit}>
        <FormWrapper formTitle='SIGN IN TO SELLER PORTAL'>
          <h4 className='form-sub-title text-center'>
            <span>New here? </span>
            <Link to='/signup' className='text-decoration-none'>
              Create new account
            </Link>
          </h4>

          <div className='form__input-wrap'>{inputFieldList}</div>

          <ButtonSubmitForm disabled={isSubmitting}>CONTINUE</ButtonSubmitForm>

          <Link
            className='link-forgot-pwd text-center mt-4 mb-1 text-decoration-none d-block'
            to='/forgot-password'>
            Forgot Password?
          </Link>
          <Link
            to='/password-validation'
            className='link-pwd-validation text-center text-decoration-none d-block'>
            Password Validation
          </Link>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}

export default Signin
