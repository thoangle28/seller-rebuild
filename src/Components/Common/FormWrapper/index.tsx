import './style.scss'

import logo from './../../../app/Images/logo.svg'
import backLoginIcon from './../../../app/Images/icons/arrow-left.svg'
import {useNavigate} from 'react-router-dom'

type Props = {
  children: JSX.Element | JSX.Element[]
  formTitle: string
  backPageLogin?: boolean
}

const FormWrapper = (props: Props) => {
  const {formTitle, children, backPageLogin} = props

  const navigate = useNavigate()

  const handleBackPageLogin = () => {
    navigate('/')
  }

  return (
    <>
      <img src={logo} alt='logo' className='logo mx-auto d-block' />
      <div className='form-wrap'>
        {backPageLogin ? (
          <div className='back-login' onClick={handleBackPageLogin}>
            <img
              src={backLoginIcon}
              alt='back-login'
              className='back-login-icon'
            />
          </div>
        ) : null}

        <h3 className={'form-title m-0 mb-3 text-center text-text-uppercase'}>
          {formTitle}
        </h3>

        {children}
      </div>
    </>
  )
}

export default FormWrapper
