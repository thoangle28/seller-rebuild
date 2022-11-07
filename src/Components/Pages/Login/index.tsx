import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import { useAppSelector, useAppDispatch } from '../../../app/Hooks/hooks'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import FormWrapper from 'Components/Common/FormWrapper'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import InputField from 'Components/Common/InputField'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import LoginSchema from './Schema/index'
import { clearMessageAction, login } from './Redux/action'
import Loading from 'Components/Common/Loading'
interface Props {
  ex?: string
}

const Signin: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, message, isFailure } = useAppSelector((state) => state.loginReducer)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values, navigate))
    },
  })

  const renderErrorMessage = (message: string) => {
    if (!message) return <></>
    return (
      <p className='signin__text-error text-danger text-center mt-4'>
        {isFailure ? message : ''}
      </p>
    )
  }
  useEffect(() => { 
    return () => {
      clearMessageAction(dispatch)
    }
  }, [])


  const inputFields = [
    {
      name: 'username',
      id: 'username',
      label: 'Email/Username',
      type: 'text',
      value: values.username,
      textError: errors.username,
      isError: errors.username && touched.username,
    },
    {
      name: 'password',
      id: 'password',
      label: 'Password',
      type: 'password',
      value: values.password,
      textError: errors.password,
      isError: errors.password && touched.password,
      iconShowPassword: values.password.length > 0 && true,
    },
  ]

  // Render list input
  const inputFieldList = inputFields.map((item) => {
    return (
      <InputField
        key={item.id}
        id={item.id}
        name={item.name}
        label={item.label}
        type={item.type}
        textError={item.textError}
        value={item.value}
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e)
          setFieldTouched(item.name, false, false)
        }}
        isError={item.isError ? true : false}
        iconShowPassword={item?.iconShowPassword}
      />
    )
  })

  return (
    <FullWidthLayout>
      <form className='form-login' onSubmit={handleSubmit}>
        <FormWrapper formTitle='SIGN IN TO SELLER PORTAL'>
          <h4 className='form-sub-title text-center'>
            <span>New here? </span>
            <Link
              to='/signup'
              className='text-decoration-none text-primary text-capitalize'>
              Create new account
            </Link>
          </h4>

          {isLoading ? (
            <div className='py-3'>
              <Loading />
            </div>
          ) : (
            <>
              <div className='form__input-wrap'>{inputFieldList}</div>
              {renderErrorMessage(message)}
            </>
          )}

          <ButtonSubmitForm disabled={isLoading}>CONTINUE</ButtonSubmitForm>

          <Link
            className='link-forgot-pwd text-center mt-3 text-decoration-none text-primary d-block'
            to='/forgot-password'>
            Forgot Password?
          </Link>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}

export default Signin
