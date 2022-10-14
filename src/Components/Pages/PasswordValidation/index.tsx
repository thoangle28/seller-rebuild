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

const ForgotPassword: FC = (props: Props) => {
  const [validateFailureMessage, setValidateFailureMessage] =
    useState<string>('')
  const navigate = useNavigate()

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
          ? navigate('/')
          : setValidateFailureMessage(data.message)
      } catch (error) {
        setValidateFailureMessage('Something went wrong, please try again')
      }
    },
  })

  const data = [
    {
      name: 'newPassword',
      id: 'newPassword',
      label: 'New Password',
      type: 'password',
      textError: errors.newPassword,
      isError: errors.newPassword && touched.newPassword,
    },
    {
      name: 'passwordConfirm',
      id: 'passwordConfirm',
      label: 'Password Confirm',
      type: 'password',
      textError: errors.passwordConfirm,
      isError: errors.passwordConfirm && touched.passwordConfirm,
    },
    {
      name: 'resetToken',
      id: 'resetToken',
      label: 'Reset token *',
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

          <ButtonSubmitForm disabled={isSubmitting}>Submit</ButtonSubmitForm>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}

export default ForgotPassword
