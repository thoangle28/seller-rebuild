import {FC} from 'react'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import FormWrapper from 'Components/Common/FormWrapper'
import {Link} from 'react-router-dom'
import './style.scss'
import InputField from 'Components/Common/InputField'
import ButtonSubmitForm from 'Components/Common/ButtonSubmitForm'

interface Props {
  ex?: string
}

const Signin: FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <FullWidthLayout>
      <FormWrapper formTitle='SIGN IN TO SELLER PORTAL'>
        <h4 className='form-sub-title text-center'>
          <span>New here? </span>
          <Link to='/signup' className='text-decoration-none'>
            Create new account
          </Link>
        </h4>

        <div className='form__input-wrap'>
          <div className='form__input-field-wrap'>
            <InputField id='email' name='email' label='Email/Username' />
          </div>
          <div className='form__input-field-wrap'>
            <InputField id='password' name='Password' label='Password' />
          </div>

          <div className='form__check-remember-pwd'>
            <input type='checkbox' name='remember-pwd' id='remember-pwd' />
            <label className='ms-3' htmlFor='remember-pwd'>
              Remember Password
            </label>
          </div>

          <ButtonSubmitForm>CONTINUE</ButtonSubmitForm>
        </div>
      </FormWrapper>
    </FullWidthLayout>
  )
}

export default Signin
