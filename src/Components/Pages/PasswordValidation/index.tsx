import axiosConfig from 'APIs/AxiosConfig'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import FormWrapper from 'Components/Common/FormWrapper'
import InputField from 'Components/Common/InputField'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import {useFormik} from 'formik'
import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PasswordValidationSchema from './Schema'
import './style.scss'
type Props = {}

const PasswordValidation: FC = (props: Props) => {
  const [validateFailureMessage, setValidateFailureMessage] =
    useState<string>('')
  const [messageSuccess, setMessageSucess] = useState<string>('')
  const navigate = useNavigate()
  const {
    errors,
    touched,
    isSubmitting,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      newPassword: '',
      passwordConfirm: '',
      resetToken: '',
    },
    validationSchema: PasswordValidationSchema,
    onSubmit: async (values) => {
      const {newPassword, passwordConfirm, resetToken} = values
      const endPoint = '/user/profile/password-recovery'
      const payload = {
        new_password: newPassword,
        password_confirm: passwordConfirm,
        reset_token: resetToken,
      }
      try {
        const {data} = await axiosConfig.post(endPoint, payload)
        data.code === 200
          ? setMessageSucess(
              data.message +
                `! This page will be redirected automatically in a few seconds.`
            )
          : setValidateFailureMessage(data.message)
      } catch (error) {
        setValidateFailureMessage('Something went wrong, please try again')
      }
    },
  })
  if (messageSuccess) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }
  const data = [
    {
      name: 'newPassword',
      id: 'newPassword',
      label: 'New Password',
      value: values.newPassword,
      type: 'password',
      textError: errors.newPassword,
      isError: errors.newPassword && touched.newPassword,
    },
    {
      name: 'passwordConfirm',
      id: 'passwordConfirm',
      label: 'Confirm Password',
      value: values.passwordConfirm,
      type: 'password',
      textError: errors.passwordConfirm,
      isError: errors.passwordConfirm && touched.passwordConfirm,
    },
    {
      name: 'resetToken',
      id: 'resetToken',
      label: 'Reset token *',
      value: values.resetToken,
      type: 'text',
      textError: errors.resetToken,
      isError: errors.resetToken && touched.resetToken,
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
        value={item.value}
        textError={item.textError}
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e)
          setValidateFailureMessage('')
          setFieldTouched(item.name, false, false)
        }}
        isError={item.isError ? true : false}
      />
    )
  })
  return (
    <FullWidthLayout>
      <form className='form-pwd-validation' onSubmit={handleSubmit}>
        <h3></h3>
        <FormWrapper formTitle='FORGOT PASSWORD VALIDATION' backPageLogin>
          <h4 className='form-sub-title text-center'>
            <span>Enter your email to reset your password.</span>
          </h4>
          <div className='form__input-wrap'>
            <div className='form__input-wrap-field'>{inputFieldList}</div>
          </div>
          <>
            {validateFailureMessage && (
              <p className='text-danger text-center mt-4'>
                {validateFailureMessage}
              </p>
            )}
          </>

          <>
            {messageSuccess && (
              <p className='message-success text-center m-0 mt-4'>
                {messageSuccess}
              </p>
            )}
          </>

          <ButtonSubmitForm disabled={messageSuccess ? true : isSubmitting}>
            Submit
          </ButtonSubmitForm>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}
export default PasswordValidation
