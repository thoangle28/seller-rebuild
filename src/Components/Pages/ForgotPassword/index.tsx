import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'
import FormWrapper from 'Components/Common/FormWrapper'
import InputField from 'Components/Common/InputField'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import {useFormik} from 'formik'
import {FC} from 'react'
import ForgotPasswordSchema from './Schema'

import './style.scss'

type Props = {}

const ForgotPassword: FC = (props: Props) => {
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
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const data = [
    {
      name: 'email',
      id: 'email',
      label: 'Email',
      type: 'email',
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
      <form className='form-forgot-password' onSubmit={handleSubmit}>
        <FormWrapper formTitle='FORGOT PASSWORD' backPageLogin>
          <h4 className='form-sub-title text-center'>
            <span>Enter your email to reset your password.</span>
          </h4>

          <div className='form__input-wrap'>
            <div className='form__input-wrap-field'>{inputFieldList}</div>
          </div>

          <ButtonSubmitForm disabled={isSubmitting}>Submit</ButtonSubmitForm>
        </FormWrapper>
      </form>
    </FullWidthLayout>
  )
}

export default ForgotPassword
