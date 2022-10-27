import axiosConfig from 'APIs/AxiosConfig'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import FormWrapper from 'Components/Common/FormWrapper'
import InputField from 'Components/Common/InputField'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import {useFormik} from 'formik'
import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PasswordValidation from '../PasswordValidation'
import ForgotPasswordSchema from './Schema'

import './style.scss'

type Props = {}

const ForgotPassword: FC = (props: Props) => {
  const [validateFailureMessage, setValidateFailureMessage] =
    useState<string>('')
  const [messageSuccess, setMessageSucess] = useState<string>('')
  const [showPasswordValidation, setShowPasswordValidation] =
    useState<boolean>(false)

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      const {email} = values
      const endPoint = '/user/profile/send-mail-forgot-password'

      try {
        const {data} = await axiosConfig.post(endPoint, {
          user_email: email,
        })

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
      setShowPasswordValidation(true)
    }, 3000)
  }

  const data = [
    {
      name: 'email',
      id: 'email',
      label: 'Email',
      type: 'email',
      value: values.email,
      textError: errors.email,
      isError: errors.email && touched.email,
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
        value={item.value}
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
      {showPasswordValidation ? (
        <PasswordValidation />
      ) : (
        <form className='form-forgot-password' onSubmit={handleSubmit}>
          <FormWrapper formTitle='FORGOT PASSWORD' backPageLogin>
            <h4 className='form-sub-title text-center'>
              <span>Enter your email to reset your password.</span>
            </h4>

            <div className='form__input-wrap'>{inputFieldList}</div>

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
              Continue
            </ButtonSubmitForm>
          </FormWrapper>
        </form>
      )}
    </FullWidthLayout>
  )
}

export default ForgotPassword
